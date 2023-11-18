import React, { useState, useEffect, useContext, } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from '../components/Loader';
import styles from '../styles';
import { UserContext } from '../UserContext';
const apiUrl = import.meta.env.VITE_API_URL;

const Layout = () => {
    const { setUserInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    // Get user info when the component mounts.
    const getUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/me`, {
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data)
            if (data.success && res.status === 200) {
                setUserInfo(data.user);
            }
        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    if (loading) {
        return <Loader />
    }
    return (
        <div className={`${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}  overflow-hidden`}>
                <Navbar />
                <Toaster position="top-right" richColors closeButton='true' /> {/* this is the position for showing notification */}
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default Layout