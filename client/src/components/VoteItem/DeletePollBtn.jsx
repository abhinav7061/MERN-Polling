import React, { useState } from 'react'
import WarningPrompt from '../CustomPopup/WarningPrompt';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const DeletePollBtn = ({ pollId, deletePollCallback }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const deletePoll = async () => {
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
                deletePollCallback(pollId);
            } else {
                throw new Error(data?.message || "Error occure during deleting the poll");
            }
        } catch (error) {
            console.log('Error while deleting your Votes', error);
            toast.error('Error while deleting your Votes');
        }
    };

    const handleAcceptance = (accepted) => {
        if (accepted) {
            deletePoll();
        }
        else {
            setShowPrompt(false);
        }
    }

    return (
        <>
            <button
                className="hover:text-red-500 flex gap-1 items-center px-2 py-1 hover:bg-red-100 rounded-md"
                title="Delete Poll"
                onClick={() => setShowPrompt(true)}
            >
                <ion-icon name="trash-outline"></ion-icon> Delete
            </button >
            <WarningPrompt
                visibility={showPrompt}
                warningMessage='Are you sure you want to delete this Poll?'
                onClose={(val) => setShowPrompt(val)}
                onAcceptance={handleAcceptance}
            />
        </>
    )
}

export default DeletePollBtn