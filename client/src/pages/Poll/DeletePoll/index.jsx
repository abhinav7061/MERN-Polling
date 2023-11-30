import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Spinner } from '../../../components/Loader/SpinLoader';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const DeletePoll = () => {
    const [path, setPath] = useState('/poll')
    const location = useLocation();
    if (location.state !== null) {
        setPath(location.state.path);
        location.state = null;
    }
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
                    navigate(path);
                }
            } catch (error) {
                console.log('Error while deleting your Votes', error);
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