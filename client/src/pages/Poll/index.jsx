import React from 'react'
import styles from '../../styles'
import Sidebar, { SidebarItem } from '../../Layout/Sidebar'
import { NavLink, useLocation, Outlet } from 'react-router-dom'; // Import Outlet for nested routing


const Poll = () => {
    const location = useLocation();
    return (
        <div className='flex'>
            <Sidebar>
                <NavLink to={'/poll'}><SidebarItem icon={<ion-icon name="apps"></ion-icon>} text={'Dashoard'} alert active={location.pathname === '/poll'} /></NavLink>
                <NavLink to={'/poll/create'}><SidebarItem icon={<ion-icon name="bar-chart-outline"></ion-icon>} text={'Create Poll'} active={location.pathname === '/poll/create'} /></NavLink>
                <NavLink to={'/poll/my-poll'}><SidebarItem icon={<ion-icon name="bar-chart-outline"></ion-icon>} text={'My Polls'} active={location.pathname === '/poll/my-poll'} /></NavLink>
                <NavLink to={'/poll/my-vote'}><SidebarItem icon={<ion-icon name="bar-chart-outline"></ion-icon>} text={'My votes'} active={location.pathname === '/poll/my-vote'} /></NavLink>
                {/* {sideLinks.map((slinks => {
                    <NavLink to={slinks.linkTo}><SidebarItem icon={<ion-icon name={slinks.icon_name}></ion-icon>} text={slinks.text} active={location.pathname === slinks.linkTo} key={slinks.id} /></NavLink>
                }))} */}
            </Sidebar>
            <div className={`${styles.paddingX} py-6 h-screen overflow-auto`} style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Poll