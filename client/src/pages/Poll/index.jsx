import React, { Suspense } from 'react'
import styles from '../../styles'
import Sidebar, { SidebarItem } from '../../Layout/Sidebar'
import { NavLink, useLocation, Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { getSideLinks } from '../../constants';
import { LargeSpinLoader } from '../../components/Loader/SpinLoader';
import Container from '../../components/Container';
import { FollowingsContextProvider } from '../../contexts/FollowingsContext';
import { FollowersContextProvider } from '../../contexts/FollowersContext';
import { useUserInfo } from '../../contexts/UserContext';

const PollLayout = () => {
    const location = useLocation();
    const { userInfo } = useUserInfo();
    const sideLinks = getSideLinks(userInfo.role);

    return (
        <FollowingsContextProvider>
            <FollowersContextProvider>
                <div className='flex bg-gray-100'>
                    <Sidebar>
                        {sideLinks.map(slinks =>
                            <NavLink to={slinks.linkTo} key={slinks.id}><SidebarItem icon={<ion-icon name={slinks.icon_name}></ion-icon>} text={slinks.text} active={location.pathname === slinks.linkTo} key={slinks.id} /></NavLink>
                        )}
                    </Sidebar>
                    <div className={`${styles.paddingX} ${styles.paddingY} flex-1 min-h-screen`} style={{ flex: 1 }}>
                        <Suspense fallback={<Container><LargeSpinLoader /></Container>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </FollowersContextProvider>
        </FollowingsContextProvider>
    )
}

export default PollLayout