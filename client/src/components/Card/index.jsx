import React from 'react'
import styles from '../../styles'

const Card = ({ img, num, title, color, progress, indicator }) => {
    // Setting colors based on color props
    const bg = {
        background: `${color || '#D4B000'}`,
    }
    const LowBg = {
        background: `${color || '#D4B000'}`,
        opacity: 0.06,
    }
    const border = {
        border: `1px solid ${color || '#D4B000'}`,
    }
    const text = {
        color: `${color || '#D4B000'}`,
    }

    return (
        <div className={`bg-white flex-1 py-4 px-6 sm:py-6 sm:px-10 rounded-xl relative overflow-hidden`} style={border}>
            <div className={`h-full w-2 absolute top-0 left-0`} style={bg}></div>
            <div className='flex justify-between mb-0 sm:mb-1'>
                <h6 className={`font-bold ${styles.heading5}`}>{title}</h6>
                <div className='flex lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 lg:p-2.5 p-1.5 rounded-full bg-slate-200'>
                    <img src={img} alt="poll" />
                </div>
            </div>
            <h1 className={`${styles.heading2} mb-0 leadi sm:mb-3`}>{num}</h1>
            <div className={`flex gap-10 items-center ${styles.smHeading}`}>
                <div className='py-[2px] px-3 rounded-2xl bg-opacity-10 overflow-hidden relative flex items-center'>
                    <div className=' absolute top-0 right-0 h-full w-full ' style={LowBg} ></div>
                    <img src={indicator} className='h-[10px] mr-2' />
                    <h6 style={text}>{progress}%</h6>
                </div>
                <h6 className=' text-slate-500 whitespace-nowrap'>Since last weak</h6>
            </div>
        </div>
    )
}

export default Card