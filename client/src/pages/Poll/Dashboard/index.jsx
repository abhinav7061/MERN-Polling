import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LargeSpinLoader } from '../../../components/Loader/SpinLoader'
import LineChart from '../../../components/LineChart'
import BarChart from '../../../components/BarChart'
import Card2 from '../../../components/Card/Card2'
import Card from '../../../components/Card'
import { polling, vote } from '../../../assets'
import styles from '../../../styles'
import './index.css'

const apiUrl = import.meta.env.VITE_API_URL; 

const Dashoard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDashoard = async () => {
            try {
                const res = await fetch(`${apiUrl}/user/dashboard`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                })
                const data = await res.json();
                if (res.ok) {
                    setDashboardData(data);
                }
            }
            catch (error) { console.log(error); }
            finally {
                setLoading(false);
            }
        }
        getDashoard();
    }, [])

    return (
        <div>
            {loading ? <div className='flex justify-center'><LargeSpinLoader /></div> : <div className='mt-8'>
                <h1 className={`${styles.heading2} mb-5`}>Polls Overview</h1>
                <div className='flex flex-col justify-between lg:flex-row items-center'>
                    <div className='mr-5'>
                        <div className='flex mb-6'>
                            <Link to='/poll/my-poll' state={{ active: 'active' }}><Card2 num={dashboardData.activePolls} title='Active Polls' color='green' /></Link>
                            <Link to='/poll/my-poll' state={{ active: 'closed' }} className='ml-5'><Card2 num={dashboardData.totalPollsCreated.totalNumber - dashboardData.activePolls} title='Closed Polls' color='red' /></Link>
                        </div>
                        <Link to='/poll/my-poll' state={{ active: 'all' }}><Card img={polling} num={dashboardData.totalPollsCreated.totalNumber} title='Polls' color={dashboardData.totalPollsCreated.growth ? 'green' : 'red'} progress={dashboardData.totalPollsCreated.thisWeek - dashboardData.totalPollsCreated.lastWeek} /></Link>
                    </div>
                    <div className='mx-3 chart mt-6'><BarChart data={dashboardData.pollChartData} label='Total Polls' /></div>
                </div>
                <h1 className={`${styles.heading2} my-5`}>Votes Overview</h1>
                <div className='flex flex-col justify-between lg:flex-row items-center'>
                    <div className='mr-5'>
                        <div className='flex mb-5'>
                            <Link to='/poll/my-vote' state={{ active: 'active' }}><Card2 num={dashboardData.activePollVotes} title='Active Votes' color='green' /></Link>
                            <Link to='/poll/my-vote' state={{ active: 'closed' }} className='ml-5'><Card2 num={dashboardData.lifetimeVotes.totalNumber - dashboardData.activePollVotes} title='Closed Vote' color='red' /></Link>
                        </div>
                        <Link to='/poll/my-vote' state={{ active: 'all' }}><Card img={vote} num={dashboardData.lifetimeVotes.totalNumber} title='Votes' color={dashboardData.lifetimeVotes.growth ? 'green' : 'red'} progress={dashboardData.lifetimeVotes.thisWeek - dashboardData.lifetimeVotes.lastWeek} /></Link>
                    </div>
                    <div className='mx-3 chart mt-6'><LineChart data={dashboardData.voteChartData} label='Total Votes' /></div>
                </div>
            </div>}
        </div>
    )
}

export default Dashoard