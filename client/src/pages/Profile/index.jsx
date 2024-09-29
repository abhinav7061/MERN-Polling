import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { incrementProgress, decrementProgress } from '../../assets';
import styles from '../../styles';
import { Spinner } from '../../components/Loader/SpinLoader';
import { polling, vote } from '../../assets';
import Followers from '../../components/Followers/index.jsx';
import Followings from '../../components/Followings/index.jsx';
import { toast } from 'sonner';
import { UserContext } from '../../contexts/UserContext';
import ErrorMessage from '../../components/ErrorMessage';

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
    const navigate = useNavigate()
    const { userInfo } = useContext(UserContext);
    const userId = useParams().id;
    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState(null);
    const [dasLoading, setDasLoading] = useState(true);
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    // Get user info when the component mounts.
    const getUser = async () => {
        setErrorMessage(null);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/${userId}`, {
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success && res.ok) {
                setUser(data.user);
            } else {
                throw new Error(data?.message || "Server Error");
            }
        } catch (error) {
            console.log('Error: ', error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false)
        }
    }

    const getDashoard = async () => {
        setErrorMessage(null);
        setDasLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/dashboard/${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                setDashboardData(data);
            } else {
                throw new Error(data?.message || "Server Error");
            }
        }
        catch (error) {
            console.log('Error while getting your dashboard', error);
            setErrorMessage(error.message);
        } finally {
            setDasLoading(false);
        }
    }

    const handleChange = () => {
        toast.warning("You are not allowed to change this data.")
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (userInfo._id == userId) {
            navigate('/poll/my_profile');
        }
        getUser();
        getDashoard();
    }, [userId])

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the dashoard" message={errorMessage} action={getDashoard} /></div>
    }

    if (loading) {
        return <div className='absolute w-full h-full z-10 flex justify-center items-center'><Spinner /></div>;
    }

    return (
        <>
            <div className='flex justify-around items-center flex-col xl:flex-row'>
                <div className='rounded-3xl bg-white sm:p-6 p-3 flex flex-col items-center w-full sm:w-auto lg:w-2/3'>
                    <div className='rounded-xl border-[2px]  border-dashed border-stone-300 p-3 flex items-center gap-2'>
                        <div className='relative flex justify-center items-center group rounded-full h-48 w-48 overflow-hidden '>
                            <img src={user.avatar.url} alt='Profile pic' className='transition-opacity duration-300  object-top object-cover  h-48 w-48' />
                        </div>
                    </div>
                    <div className='flex items-center gap-10 my-5 relative'>
                        <h1 className={`font-bold ${styles.heading4}`}>{user.name}</h1>
                        <textarea
                            type="text"
                            name='myStatus'
                            value={user.myStatus}
                            className='outline-none text-[12px] lg:text-[16px] resize-none py-1 rounded-md border-2 border-transparent focus:border-slate-500 lg:px-3 sm:px-1'
                            onChange={handleChange}
                            disabled={true}
                        />
                    </div>
                    <div className=' rounded-xl p-3 bg-slate-50'>
                        <div className='flex flex-wrap items-center my-3'>
                            <label htmlFor="name" className='ml-2 font-semibold mr-5' style={{ whiteSpace: 'nowrap' }}>Name:</label>
                            <input
                                type="text"
                                name='name'
                                value={user.name}
                                className='outline-none my-[2px] px-3 py-1 rounded-md border-2 focus:border-slate-500 w-full overflow-scroll'
                                onChange={handleChange}
                                disabled={true} />
                        </div>
                        <div className='flex flex-wrap items-center my-3'>
                            <label htmlFor="email" className='ml-2 font-semibold mr-5' style={{ whiteSpace: 'nowrap' }}>Email:</label>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                className='outline-none my-[2px] px-3 py-1 rounded-md border-2 focus:border-slate-500 w-full overflow-scroll'
                                onChange={handleChange}
                                disabled={true} />
                        </div>
                    </div>
                </div>
                {dasLoading ? <Spinner /> : <div className='ml-5 sm:flex flex-col items-center gap-6 md:gap-8 mt-8 xl:mt-0 hidden'>
                    <Card img={polling} num={dashboardData.totalPollsCreated.totalNumber} title={`${user.name}'s Total Polls`} color={dashboardData.totalPollsCreated.growth ? 'green' : 'red'} progress={dashboardData.totalPollsCreated.growthPercentage} indicator={dashboardData.totalPollsCreated.growth ? incrementProgress : decrementProgress} />
                    <Card img={vote} num={dashboardData.lifetimeVotes.totalNumber} title={`${user.name}'s Total Votes`} color={dashboardData.lifetimeVotes.growth ? 'green' : 'red'} progress={dashboardData.lifetimeVotes.growthPercentage} indicator={dashboardData.lifetimeVotes.growth ? incrementProgress : decrementProgress} />
                </div>}
            </div>
            <div className='flex gap-12 w-full mt-12 lg:flex-row flex-col'>
                <Followers userId={userId} userName={user.name} />
                <Followings userId={userId} userName={user.name} />
            </div>
        </>
    )
}

export default Profile