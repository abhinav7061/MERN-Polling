import React from 'react'
import styles from '../../../styles'
import { toast } from 'sonner';
import PollEditor from '../PollEditor';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const CreatePoll = () => {
    const navigate = useNavigate();
    const initialData = {
        question: "",
        description: "",
        optionList: [],
        endDate: '',
    }
    const createPoll = async (question, description, optionList, date) => {
        const title = question;
        const options = optionList.map(subject => ({ subject }));
        const endDate = new Date(date);
        try {
            const res = await fetch(`${apiUrl}/poll/createPoll`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ title, description, options, endDate })
            });
            const data = await res.json();
            if (res.status === 400 || data.success === false) {
                toast.error(data.message);
            } else {
                toast.success("Your poll has been created successfully");
                navigate('/poll')
            }
        } catch (error) {
            console.log("Error while creating the poll", error);
        }
    }

    const handleSubmit = ({ question, description, optionList, endDate }) => {
        createPoll(question, description, optionList, endDate);
    }
    return (
        <>
            <h1 className={`${styles.heading2} mb-6`}>Create Free Poll With PollLab</h1>
            <PollEditor handleSubmit={handleSubmit} initialData={initialData} reset type='Create' />
        </>
    )
}

export default CreatePoll