import React from 'react'
import styles from '../../../styles'
import { polling, vote } from '../../../assets'
import Card from '../../../components/Card'

const Dashoard = () => {
    return (
        <div>
            <h1 className={`${styles.heading2} `}>Overview</h1>
            <div className='flex justify-evenly gap-8 flex-wrap mt-8'>
                <Card img={polling} num='14' title='Active Polls' />
                <Card img={vote} num='11' title='Active Votes' />
                <Card img={polling} num='173' title='Polls' />
                <Card img={vote} num='138' title='Votes' />
                <Card img={polling} num='14' title='Active Polls' />
                <Card img={vote} num='11' title='Active Votes' />
                <Card img={polling} num='173' title='Polls' />
                <Card img={vote} num='138' title='Votes' />
            </div>
        </div>
    )
}

export default Dashoard