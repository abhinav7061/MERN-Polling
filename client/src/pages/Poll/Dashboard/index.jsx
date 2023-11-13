import React from 'react'
import styles from '../../../styles'
import { polling, vote } from '../../../assets'
import Card from '../../../components/Card'

const Dashoard = () => {
    return (
        <div>
            <h1 className={`${styles.heading2} `}>Overview</h1>
            <div className='flex justify-evenly gap-8 flex-wrap mt-8'>
                <Card img={polling} num='14' title='Active Polls' color='green' progress='17' />
                <Card img={vote} num='11' title='Active Votes' color='red' progress='5' />
                <Card img={polling} num='173' title='Polls' color='#ffb300' progress='7' />
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