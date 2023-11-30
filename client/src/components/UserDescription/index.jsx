import React, { useState, useEffect } from 'react'
import styles from '../../styles'
import SimpleSpinLoader from '../Loader/SpinLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const UserDescription = ({ userId }) => {
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
        <div className="flex md:p-3 p-1 justify-between items-center">
            {loading ? <SimpleSpinLoader /> : (<>
                <div className='flex'>
                    <img
                        src={`${apiUrl}/profile-image/${user.avatar.url}`}
                        alt=""
                        className="rounded-full object-top object-cover bg-slate-300 w-9 h-9 sm:h-12 sm:w-12"
                    />
                    <div className={`flex justify-between items-center overflow-hidden transition-all md:ml-3 sm:ml-2 ml-1`}>
                        <div className="leading-3 md:leading-5">
                            <h4 className={`${styles.heading5} font-semibold`}>{user.name || 'Unknown User'}</h4>
                            <span className={`${styles.heading6} text-gray-600`}>{user.email || 'No Email Available'}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='flex items-center'>
                    <button className={`${styles.heading6} font-semibold px-2 md:px-3 py-1 bg-slate-300 rounded-lg mr-0 md:mr-3 hover:bg-sky-500 duration-700 transition-colors `}> Follow +</button>
                    <span className='cursor-pointer'><ion-icon name="ellipsis-vertical-sharp"></ion-icon></span>
                </div> */}
            </>)}
        </div>
    )
}

export default UserDescription