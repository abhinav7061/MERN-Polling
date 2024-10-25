import React from 'react'
import styles from '../../styles'

const MainActionBtn = ({ icon, title, onClick, className }) => {
    return (
        <div className={`${styles.heading6} flex gap-1 items-center justify-center flex-grow p-2 rounded-md hover:bg-slate-200 cursor-pointer ${className}`} onClick={onClick}>
            <span className="flex text-sm md:text-2xl">
                {icon}
            </span>
                {title}
        </div>
    )
}

export default MainActionBtn