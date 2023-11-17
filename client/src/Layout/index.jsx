import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from 'sonner';
import styles from '../styles';

const Layout = () => {
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