import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles';
import formatRelativeDate from '../../utilities/relativeDate';
import PaginatedTable from '../../components/PaginatedTable';
import ChangeRole from './ChangeRole';
import { useUserInfo } from '../../contexts/UserContext';
import DeleteUser from '../../components/DeleteUser';

const apiUrl = import.meta.env.VITE_API_URL;
const cache = {};

const AllUsers = () => {
    const { userInfo, setUserInfo } = useUserInfo();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemPerPage] = useState(10);
    const [role, setRole] = useState('all');
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    const usersTableColumns = [
        {
            header: 'User',
            accessor: 'user',
            render: (user) => <Link to={`/poll/profile/${user?._id}`} className='flex justify-end w-full'><img src={user?.avatar.url} alt={user?.name || "avatar"} className='rounded-full h-8 aspect-square' title={user?.name} /></Link>,
        },
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: <select value={role} onChange={(e) => setRole(e.target.value)} className='flex border border-slate-300 rounded-md px-2 py-1'>
                <option value={'all'}>Role</option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
            </select>,
            accessor: 'role',
        },
        {
            header: 'IsVarified',
            accessor: 'isVerified',
            render: (user) => (
                <p>{user.isVerified ? 'Yes' : 'No'}</p>
            )
        },
        {
            header: 'Status',
            accessor: 'myStatus',
            render: (user) => (
                <p className='min-w-[350px]'>{user.myStatus}</p>
            )
        },
        {
            header: 'Joinded At',
            accessor: 'Joinded At',
            render: (user) => (
                <p className='whitespace-nowrap'>{formatRelativeDate(new Date(user.createdAt))}</p>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (user) => (
                <span className='flex gap-2 w-full justify-start'>
                    <DeleteUser userId={user._id} userName={user.name} onSuccessUserDeleted={() => {
                        setUsers(users.filter(user2 => user2._id != user._id))
                        setTotalItems((prevTotal) => prevTotal - 1);
                        Object.keys(cache).forEach((key) => delete cache[key]);
                        if (user._id == userInfo._id) {
                            setUserInfo(null);
                            navigate('/');
                        }
                    }} />
                    <ChangeRole userId={user._id} currentRole={user.role} userName={user.name} onSuccessfullRoleChanged={() => setUsers(prevUsers =>
                        prevUsers.map(preUser => {
                            const newRole = user.role == 'user' ? 'admin' : "user";
                            return preUser._id === user._id ? { ...preUser, role: newRole } : preUser
                        }))} />
                </span>
            ),
        },
    ];

    const getAllUsers = async (page) => {
        if (cache[page]) {
            setUsers(cache[page].users);
            setTotalItems(cache[page].totalItems);
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/user/allUsers?page=${currentPage}&itemsPerPage=${encodeURIComponent(itemsPerPage)}&search=${encodeURIComponent(search)}&role=${role}`);
            const data = await response.json();
            if (data.success) {
                cache[page] = { users: data.users, totalItems: data.totalItems };
                setUsers(data.users);
                setTotalItems(data.totalItems);
            }
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    useEffect(() => {
        getAllUsers(currentPage);
    }, [currentPage]);

    useEffect(() => {
        Object.keys(cache).forEach((key) => delete cache[key]);
        setCurrentPage(1);
        getAllUsers(currentPage);
    }, [itemsPerPage, search, role])

    return (
        <div className=' py-10 px-2 sm:py-0 sm:px-0 flex justify-center items-center flex-col'>
            <h1 className={`${styles.heading2} text-start w-full`}>AllUsers</h1>
            <PaginatedTable
                data={users}
                columns={usersTableColumns}
                loading={loading}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                search={search}
                setSearch={setSearch}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setItemPerPage={setItemPerPage}
            />
        </div>
    )
}

export default AllUsers