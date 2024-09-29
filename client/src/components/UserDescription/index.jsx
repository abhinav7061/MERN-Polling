import React, { useState, useEffect, useContext } from 'react'
import styles from '../../styles'
import SimpleSpinLoader from '../Loader/SpinLoader';
import { Link } from 'react-router-dom';
import ErrorMessage2 from '../ErrorMessage/ErrorMessage2';
import { UserContext } from '../../contexts/UserContext';

const apiUrl = import.meta.env.VITE_API_URL;

const UserDescription = ({ userId, children }) => {
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
                    <Link to={`/poll/profile/${user._id}`}>
                        <img
                            src={user.avatar.url}
                            alt="profile image"
                            title={`See ${userInfo._id == userId ? "Your" : `${user.name}'s`} profile`}
                            className="rounded-full object-top object-cover bg-slate-300 w-7 h-7 sm:h-12 sm:w-12"
                        />
                    </Link>
                    <div className="leading-3 md:leading-5 md:ml-3 sm:ml-2 ml-1">
                        <h4 className={`${styles.heading5} font-semibold line-clamp-1`}>{user.name || 'Anonymous User'}</h4>
                        <span className={`${styles.heading6} text-gray-600 line-clamp-1`}>{user.email || 'No Email Available'}</span>
                    </div>
                </div>
                {children}
            </>)}
        </div>
    )
}

export default UserDescription