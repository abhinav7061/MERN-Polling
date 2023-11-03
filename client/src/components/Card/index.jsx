import React from 'react'
import styles from '../../styles'

const Card = ({ img, num, title, }) => {
    return (
        <div className='bg-white py-6 px-10 rounded-xl lg:basis-[420px] basis-96'>
            <div className='flex justify-between mb-1'>
                <h6 className=' font-bold lg:text-[18px] sm:text-[16px] text-[12px] '>My Total {title}</h6>
                <div className='flex lg:h-10 lg:w-10 sm:h-8 sm:w-8 h-6 w-6 lg:p-2.5 p-1.5 rounded-full bg-slate-200'>
                    <img src={img} alt="poll" />
                </div>
            </div>
            <h1 className={`${styles.heading2} mb-3`}>{num}</h1>
            <div className='flex gap-10 items-center sm:text-[13px] text-[8px]'>
                <h6 className=' py-[2px] px-3 rounded-2xl bg-green-50 text-green-600'>17%</h6>
                <h6 className=' text-slate-400'>Since last weak</h6>
            </div>
        </div>
    )
}

export default Card