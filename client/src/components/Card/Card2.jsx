import React from 'react'
import styles from '../../styles'

const Card2 = ({ num, title, color }) => {
    const border = {
        border: `1px solid ${color || '#D4B000'}`,
    }
    const bg = {
        background: `${color || '#D4B000'}`,
    }
    return (
        <div className={`bg-white py-2 pl-4 sm:py-6 sm:px-5 rounded-lg relative overflow-hidden`} style={border}>
            <div className={`h-full w-2 absolute top-0 left-0`} style={bg}></div>
            <div>
                <h6 className={` ${styles.heading6} whitespace-nowrap`}>My Total {title}</h6>
                <h1 className={`${styles.heading3} font-semibold`}>{num}</h1>
            </div>
        </div>
    )
}

export default Card2