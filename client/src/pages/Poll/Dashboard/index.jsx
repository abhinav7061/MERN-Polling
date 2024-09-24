import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LargeSpinLoader } from '../../../components/Loader/SpinLoader'
import LineChart from '../../../components/LineChart'
import BarChart from '../../../components/BarChart'
import Card2 from '../../../components/Card/Card2'
import Card from '../../../components/Card'
import { polling, vote, incrementProgress, decrementProgress } from '../../../assets'
import styles from '../../../styles'
import './index.css'
import { UserContext } from '../../../contexts/UserContext'
import ErrorMessage from '../../../components/ErrorMessage'

const apiUrl = import.meta.env.VITE_API_URL;

const Dashoard = () => {
    const { userInfo } = useContext(UserContext);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    const getDashoard = async () => {
        setErrorMessage(null);
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/user/dashboard/${userInfo._id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                setDashboardData(data);
                setLoading(false);
            } else {
                throw new Error(data?.message || "error while fetching the dashoard");
            }
        }
        catch (error) {
            console.log('Error while getting your dashboard', error);
            setErrorMessage(error.message);
        }
    }
    useEffect(() => {
        getDashoard();
    }, [])

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the dashoard" message={errorMessage} action={getDashoard} /></div>
    }

    return (
        <div>
            {
                loading ? (
                    <div className='flex justify-center'><LargeSpinLoader /></div>
                ) : (
                    <div className='py-8 overflow-x-hidden'>
                        <h1 className={`${styles.heading2} mb-5`}>Polls Overview</h1>
                        {/* div for showing the polls information  */}
                        <div className='flex flex-col justify-between xl:flex-row items-center gap-5'>
                            <div>
                                <div className='flex sm:flex-col md:flex-row gap-5 mb-6'>
                                    <Link to='/poll/my-poll' state={{ active: 'active' }}><Card2 num={dashboardData.activePolls} title='Active Polls' color='green' /></Link>
                                    <Link to='/poll/my-poll' state={{ active: 'closed' }}><Card2 num={dashboardData.totalPollsCreated.totalNumber - dashboardData.activePolls} title='Closed Polls' color='red' /></Link>
                                </div>
                                <Link to='/poll/my-poll' state={{ active: 'all' }}><Card img={polling} num={dashboardData.totalPollsCreated.totalNumber} title='Polls' color={dashboardData.totalPollsCreated.growth ? 'green' : 'red'} progress={dashboardData.totalPollsCreated.growthPercentage} indicator={dashboardData.totalPollsCreated.growth ? incrementProgress : decrementProgress} /></Link>
                            </div>
                            <div className='mx-3 w-60 sm:w-80 md:w-96 h-64 sm:h-80 flex-grow flex items-center justify-center bg-white p-4 rounded-lg shadow-md'><BarChart data={dashboardData.pollChartData} label='Total Polls' /></div>
                        </div>
                        <h1 className={`${styles.heading2} my-5`}>Votes Overview</h1>
                        {/* div for showing the votes information  */}
                        <div className='flex flex-col justify-between xl:flex-row items-center gap-5'>
                            <div>
                                <div className='flex sm:flex-col md:flex-row gap-5 mb-5'>
                                    <Link to='/poll/my-vote' state={{ active: 'active' }}><Card2 num={dashboardData.activePollVotes} title='Active Votes' color='green' /></Link>
                                    <Link to='/poll/my-vote' state={{ active: 'closed' }}><Card2 num={dashboardData.lifetimeVotes.totalNumber - dashboardData.activePollVotes} title='Closed Vote' color='red' /></Link>
                                </div>
                                <Link to='/poll/my-vote' state={{ active: 'all' }}><Card img={vote} num={dashboardData.lifetimeVotes.totalNumber} title='Votes' color={dashboardData.lifetimeVotes.growth ? 'green' : 'red'} progress={dashboardData.lifetimeVotes.growthPercentage} indicator={dashboardData.lifetimeVotes.growth ? incrementProgress : decrementProgress} /></Link>
                            </div>
                            <div className='mx-3 w-60 sm:w-80 md:w-96 h-64 sm:h-80 flex-grow flex items-center justify-center bg-white p-4 rounded-lg shadow-md'><LineChart data={dashboardData.voteChartData} label='Total Votes' /></div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Dashoard