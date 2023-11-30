import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { UserContext } from '../../UserContext';
import styles from '../../styles';

const apiUrl = import.meta.env.VITE_API_URL;

const LogoutBtn = () => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const res = await fetch(`${apiUrl}/user/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Logged out successfully");
                setUserInfo(null);
                navigate('/');
                console.log("logout successfully");
            } else {
                // Handle error, show error message, .
                toast.error("Logout failed");
                console.error("Logout failed:", data.message);
            }
        } catch (error) {
            toast.info("Error during logout")
            console.log("Error during logout:", error);
        }
    }
    return (
        <div className={`text-white ml-2 cursor-pointer flex items-center ${styles.heading4}`} onClick={logout} title='Logout'>
            <ion-icon name="log-out-outline"></ion-icon>
        </div>
    )
}

export default LogoutBtn