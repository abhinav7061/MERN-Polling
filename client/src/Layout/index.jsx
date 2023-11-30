import React, { useState, useEffect, useContext, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from '../components/Loader';
import styles from '../styles';
import { UserContext } from '../UserContext';
import { LargeSpinLoader } from '../components/Loader/SpinLoader';
import Container from '../components/Container';
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
            if (data.success && res.ok) {
                setUserInfo(data.user);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className={`${styles.flexCenter}`}>
            {
                loading ? (
                    <Loader />
                ) : (
                    <div className={`${styles.boxWidth}  overflow-hidden`}>
                        <Navbar />
                        <Toaster position="top-right" richColors closeButton='true' /> {/* this is the position for showing notification */}
                        <Suspense fallback={<Container><LargeSpinLoader /></Container>}>
                            <Outlet />
                        </Suspense>
                        <Footer />
                    </div>
                )
            }
        </div>
    )
}

export default Layout