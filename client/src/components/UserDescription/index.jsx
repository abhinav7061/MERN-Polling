import React, { useState, useEffect } from 'react'
import styles from '../../styles'
import SimpleSpinLoader from '../Loader/SpinLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const UserDescription = ({ userId, children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
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
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className="flex md:p-3 p-1 justify-between items-center overflow-hidden">
            {loading ? <SimpleSpinLoader /> : (<>
                <div className='flex'>
                    <img
                        src={`${apiUrl}/profile-image/${user.avatar.url}`}
                        alt=""
                        className="rounded-full object-top object-cover bg-slate-300 w-7 h-7 sm:h-12 sm:w-12"
                    />
                    <div className="leading-3 md:leading-5 md:ml-3 sm:ml-2 ml-1">
                        <h4 className={`${styles.heading5} font-semibold line-clamp-1`}>{user.name || 'Unknown User'}</h4>
                        <span className={`${styles.heading6} text-gray-600 line-clamp-1`}>{user.email || 'No Email Available'}</span>
                    </div>
                </div>
                {children}
            </>)}
        </div>
    )
}

export default UserDescription