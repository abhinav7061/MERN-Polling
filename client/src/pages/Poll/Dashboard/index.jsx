import React from 'react'
import styles from '../../../styles'
import { polling, vote } from '../../../assets'
import Card from '../../../components/Card'
import { Link } from 'react-router-dom'

const Dashoard = () => {
    return (
        <div>
            <h1 className={`${styles.heading2} `}>Overview</h1>
            <div className='flex justify-evenly gap-8 flex-wrap mt-8'>
                <Link to='/poll/my-poll' state={{ active: 'active' }}><Card img={polling} num='14' title='Active Polls' color='green' progress='17' /></Link>
                <Link to='/poll/my-poll' state={{ active: 'closed' }}><Card img={polling} num='14' title='Closed Polls' color='red' progress='17' /></Link>
                <Link to='/poll/my-poll' state={{ active: 'all' }}><Card img={polling} num='173' title='Polls' color='#ffb300' progress='7' /></Link>
                <Card img={vote} num='11' title='Active Votes' color='green' progress='5' />
                <Card img={vote} num='138' title='Votes' color='blue' progress='13' />
                <Card img={polling} num='14' title='Active Polls' color='green' progress='17' />
                <Card img={vote} num='11' title='Active Votes' color='red' progress='17' />
                <Card img={polling} num='173' title='Polls' color='#ffb300' progress='17' />
                <Card img={vote} num='138' title='Votes' color='blue' progress='17' />
            </div>
        </div>
    )
}

export default Dashoard