import React, { useState, useEffect, useContext, Suspense } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import Navbar from './Navbar'
import Footer from './Footer'
import Loader from '../components/Loader';
import styles from '../styles';
import { UserContext } from '../contexts/UserContext';
import { LargeSpinLoader } from '../components/Loader/SpinLoader';
import Container from '../components/Container';
import getLocalValue from '../utilities/handleLocalStorage';
const apiUrl = import.meta.env.VITE_API_URL;

const Layout = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();
    const location = useLocation();

    // Get user info when the component mounts.
    const getUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/me`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success && res.ok) {
                setUserInfo(data.user);
                if (!location.pathname.startsWith('/poll')) {
                    navigate('/poll');
                }
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
                    <div className={`${styles.boxWidth} flex flex-col min-h-screen`}>
                        {userInfo ? null : <Navbar />}
                        <Toaster position="top-right" richColors closeButton='true' /> {/* this is the position for showing notification */}
                        <Suspense fallback={<Container><LargeSpinLoader /></Container>}>
                            <Outlet />
                        </Suspense>
                        {userInfo ? null : <Footer />}
                    </div>
                )
            }
        </div>
    )
}

export default Layout