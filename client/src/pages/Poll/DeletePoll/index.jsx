import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../../components/Loader/SpinLoader';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const DeletePoll = () => {
    const pollId = useParams().id;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiUrl}/poll/delete/${pollId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.success) {
                    toast.info('Poll deleted');
                    navigate('/poll');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [pollId]);

    return (
        <div className='flex justify-center items-center'>
            <h1 className='absolute text-red-500 font-bold text-xl opacity-50'>Trying to Delete</h1>
            <Spinner />
        </div>
    )
}

export default DeletePoll