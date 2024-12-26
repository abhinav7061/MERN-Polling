import React, { useState } from 'react'
import { toast } from 'sonner'
import WarningPrompt from '..//CustomPopup/WarningPrompt';
import Button from '../Button';
import getLocalValue from '../../utilities/handleLocalStorage';

const apiUrl = import.meta.env.VITE_API_URL;

const DeleteUser = ({ userId, title = 'Delete Account', onSuccessUserDeleted }) => {
    const [showPrompt, setShowPrompt] = useState(false);

    const handleAcceptance = (accepted) => {
        if (accepted) {
            deleteUser();
        }
        setShowPrompt(false);
    };

    const deleteUser = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/delete-profile/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include',
            })
            const data = await response.json();
            if (data.success) {
                toast.success('User deleted successfully');
                onSuccessUserDeleted();
            } else {
                toast.error(data.message || "Error deleting user");
            }
        } catch (e) {
            console.log(e);
            toast.error('Error deleting user');
        }
    }
    return (
        <>
            <Button styles='text-xs px-2 py-1 whitespace-nowrap rounded-md flex-1' title={title} onclicks={() => setShowPrompt(true)} />
            <WarningPrompt
                visibility={showPrompt}
                warningMessage={<p><span className='text-red-600 font-bold'>Caution:</span> Deleting Account is irreversible. Proceed with caution.</p>}
                onClose={(val) => setShowPrompt(val)}
                onAcceptance={handleAcceptance}
            />
        </>
    )
}

export default DeleteUser