import React, { useContext } from 'react';
import Button from '.';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../App';
import { toast } from 'sonner';

const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName] = cookie.trim().split('=');
        // Set each cookie's expiration date to a past date
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

const LogoutBtn = () => {
    const navigate = useNavigate();
    const {
        currentUser,
        isLoggedIn,
        setIsLoggedIn,
    } = useContext(CurrentUserContext);
    // const logout = () => {
    //     clearAllCookies();
    //     console.log("logout successfully");
    //     navigate('/');
    // }
    const logout = () => {
        clearAllCookies();
        toast.success("Logged out successfully");
        console.log("logout successfully");
        setIsLoggedIn(false);
    }
    return (
        <Button styles={`px-5 py-[5px] ml-5`} title={`Logout`} onclicks={logout} />
    )
}

export default LogoutBtn