import React, { useState, useEffect } from 'react'
import PollEditor from '../PollEditor'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../../styles';
import { Spinner } from '../../../components/Loader/SpinLoader';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const EditPoll = () => {
    const pollId = useParams().id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [path, setPath] = useState('/poll')
    const location = useLocation();
    if (location.state !== null) {
        setPath(location.state.path);
        location.state = null;
    }
    // Set initial data state
    const [initialData, setInitialData] = useState({
        question: '',
        description: '',
        optionList: [],
    });
    const editPoll = async ({ question, description, optionList }) => {
        let title = question;
        let options = optionList.map(subject => ({ subject }));
        try {
            const res = await fetch(`${apiUrl}/poll/updatePoll/${pollId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ title, description, options })
            });
            const data = await res.json();
            if (res.status === 400 || data.success === false) {
                toast.error(data.message);
            } else {
                toast.success("Your poll has been Updated successfully");
                navigate(path);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = ({ question, description, optionList }) => {
        editPoll({ question, description, optionList });
    }

    useEffect(() => {
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
                    });
                    //setting loading false
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [pollId]);

    return (
        <>
            <h1 className={`${styles.heading2} mb-6`}>Create Free Poll With PollLab</h1>
            {loading ? <div className='flex justify-center'><Spinner /></div> : <PollEditor handleSubmit={handleSubmit} initialData={initialData} reset type='Edit' />}
        </>
    )
}

export default EditPoll