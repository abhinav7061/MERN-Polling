import React, { useState, useEffect, useContext } from 'react'
import styles from '../../styles'
import SimpleSpinLoader from '../Loader/SpinLoader';
import { Link } from 'react-router-dom';
import ErrorMessage2 from '../ErrorMessage/ErrorMessage2';
import { UserContext } from '../../contexts/UserContext';
import getLocalValue from '../../utilities/handleLocalStorage';

const apiUrl = import.meta.env.VITE_API_URL;

const UserDescription = ({ userId, children, imageClassName, nameClassName }) => {
    const { userInfo } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    const getUser = async () => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetch(`${apiUrl}/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (data.success && response.ok) {
                setUser(data.user)
            } else {
                throw new Error(data?.message || "Server Error");
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className="flex md:p-3 p-1 justify-between items-center">
            {errorMessage ? <ErrorMessage2 message={'Error fetching the user'} action={getUser} /> : loading ? <SimpleSpinLoader /> : (<>
                <div className='flex'>
                    <Link to={`/poll/profile/${user._id}`} className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 ${imageClassName}`}>
                        <img
                            src={user.avatar.url}
                            alt="profile image"
                            title={`See ${userInfo._id == userId ? "Your" : `${user.name}'s`} profile`}
                            className="rounded-full object-top object-cover bg-slate-300 w-full h-full"
                        />
                    </Link>
                    <div className="md:ml-3 sm:ml-2 ml-1 max-w-[250px] lg:max-w-[350px]">
                        <h4 className={`text-sm sm:text-base font-semibold line-clamp-1 ${nameClassName}`}>{user.name || 'Anonymous User'}</h4>
                        <span className={`${styles.smHeading} text-gray-600 line-clamp-1 font-thin`}>{user.myStatus || ''}</span>
                    </div>
                </div>
                {children}
            </>)}
        </div>
    )
}

export default UserDescription