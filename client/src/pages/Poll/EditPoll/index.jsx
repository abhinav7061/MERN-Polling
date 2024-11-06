import React, { useState, useEffect } from 'react'
import PollEditor from '../PollEditor'
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../../../styles';
import { Spinner } from '../../../components/Loader/SpinLoader';
import { toast } from 'sonner';
import ErrorMessage from '../../../components/ErrorMessage';
import getLocalValue from '../../../utilities/handleLocalStorage';

const apiUrl = import.meta.env.VITE_API_URL;

const EditPoll = () => {
    const pollId = useParams().id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    // Set initial data state
    const [initialData, setInitialData] = useState({
        question: '',
        description: '',
        optionList: [],
        endDate: '',
    });

    const handleSubmit = async ({ question, description, optionList, endDate }) => {
        let title = question;
        let options = optionList.map(subject => ({ subject }));
        try {
            const res = await fetch(`${apiUrl}/poll/updatePoll/${pollId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({ title, description, options, endDate })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Your poll has been Updated successfully");
                navigate(-1);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log('Error during editing your poll', error);
            toast.error('Error updatin poll');
        }
    }

    const fetchData = async () => {
        try {
            const res = await fetch(`${apiUrl}/poll/getPoll/${pollId}`);
            const data = await res.json();
            if (data.success) {
                const fetchedData = data.poll;

                // Set initial data state based on fetched data
                setInitialData({
                    question: fetchedData.title,
                    description: fetchedData.description,
                    optionList: fetchedData.options.map(option => option.subject),
                    endDate: new Date(fetchedData.endDate),
                });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log('Error getting your poll', error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pollId]);

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the dashoard" message={errorMessage} action={fetchData} /></div>
    }

    return (
        <>
            <h1 className={`${styles.heading2} mb-6`}>Create Free Poll With PollLab</h1>
            {loading ? <div className='flex justify-center'><Spinner /></div> : <PollEditor handleSubmit={handleSubmit} initialData={initialData} reset type='Edit' />}
        </>
    )
}

export default EditPoll