import React from 'react'
import styles from '../../styles'

const MainActionBtn = ({ icon, title, onClick, className }) => {
    return (
        <div className={`${styles.heading6} flex gap-1 items-center justify-center flex-grow p-2 rounded-md hover:bg-slate-200 cursor-pointer ${className}`} onClick={onClick}>
            <span className="flex text-sm md:text-2xl">
                {icon}
            </span>
            <h5 className='lg:hidden xl:block'>
                {title}
            </h5>
        </div>
    )
}

export default MainActionBtn