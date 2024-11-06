import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VoteItem from '../../components/VoteItem';
import { getData } from '../../utilities/apiCall';
import { Spinner } from '../../components/Loader/SpinLoader';
import ErrorMessage from '../../components/ErrorMessage';
import getLocalValue from '../../utilities/handleLocalStorage';

const apiUrl = import.meta.env.VITE_API_URL;

const Poll = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pollData, setPollData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const pollId = params.pollId;
    const fetchData = async () => {
        setLoading(true);
        setErrorMsg(null)
        try {
            const data = await getData(`${apiUrl}/poll/getPoll/${pollId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include'
            });
            console.log(data);
            setPollData(data.poll);
        } catch (error) {
            console.error(error);
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    if (errorMsg) {
        return <ErrorMessage heading='Error fetching the poll' message={errorMsg} action={fetchData} />
    }
    return (
        <div className='w-full flex justify-center border'>
            {loading ? <Spinner /> : <div className='bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2 relative max-w-[750px] flex-grow'><VoteItem pollData={pollData} deletePollCallback={() => { navigate('/poll') }} /></div>}
        </div>
    )
}

export default Poll