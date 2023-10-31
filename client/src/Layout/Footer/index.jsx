import React from 'react'
import styles from '../../styles'
import { footerLinks } from '../../constants'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className={`${styles.paddingX} bg-gray-900 text-white md:py-5 py-3 flex justify-between items-center text-[14px]`}>
            <p>
                Copyright Ⓒ 2023 Pollab.<br className='md:hidden' /> All Rights Reserved.
            </p>
            <div>
                <ul className='flex  flex-col md:flex-row'>
                    {footerLinks.map((flink) => (
                        <li className='m-2' key={flink.id}>
                            <Link to={flink.linkTo}>{flink.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Footer