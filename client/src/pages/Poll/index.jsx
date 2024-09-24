import React, { Suspense } from 'react'
import styles from '../../styles'
import Sidebar, { SidebarItem } from '../../Layout/Sidebar'
import { NavLink, useLocation, Outlet } from 'react-router-dom'; // Import Outlet for nested routing
import { sideLinks } from '../../constants';
import { LargeSpinLoader } from '../../components/Loader/SpinLoader';
import Container from '../../components/Container';
import { FollowingsContextProvider } from '../../contexts/FollowingsContext';
import { FollowersContextProvider } from '../../contexts/FollowersContext';

const Poll = () => {
    const location = useLocation();
    return (
        <FollowingsContextProvider>
            <FollowersContextProvider>
                <div className='flex bg-slate-100'>
                    <Sidebar>
                        {sideLinks.map(slinks =>
                            <NavLink to={slinks.linkTo} key={slinks.id}><SidebarItem icon={<ion-icon name={slinks.icon_name}></ion-icon>} text={slinks.text} active={location.pathname === slinks.linkTo} key={slinks.id} /></NavLink>
                        )}
                    </Sidebar>
                    <div className={`${styles.paddingX} flex-1`} style={{ flex: 1 }}>
                        <Suspense fallback={<Container><LargeSpinLoader /></Container>}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </FollowersContextProvider>
        </FollowingsContextProvider>
    )
}

export default Poll