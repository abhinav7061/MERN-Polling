import React from 'react'
import styles from '../../../styles'
import { toast } from 'sonner';
import PollEditor from '../PollEditor';
import { useNavigate } from 'react-router-dom';
import getLocalValue from '../../../utilities/handleLocalStorage';
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
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include',
                body: JSON.stringify({ title, description, options, endDate })
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Your poll has been created successfully");
                navigate('/poll')
            } else {
                toast.error(data.message || "Error Creating poll");
            }
        } catch (error) {
            console.log("Error while creating the poll", error);
            toast.error("Error creating poll");
        }
    }

    const handleSubmit = ({ question, description, optionList, endDate }) => {
        createPoll(question, description, optionList, endDate);
    }
    return (
        <div className='pt-10 sm:pt-0 px-3 sm:px-0'>
            <h1 className={`${styles.heading2} mb-6`}>Create Free Poll With PollLab</h1>
            <PollEditor handleSubmit={handleSubmit} initialData={initialData} reset type='Create' />
        </div>
    )
}

export default CreatePoll