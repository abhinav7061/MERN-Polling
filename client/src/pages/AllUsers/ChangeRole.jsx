import React, { useState } from 'react'
import { toast } from 'sonner'
import WarningPrompt from '../../components/CustomPopup/WarningPrompt';
import Button from '../../components/Button';
import getLocalValue from '../../utilities/handleLocalStorage';

const apiUrl = import.meta.env.VITE_API_URL;

const ChangeRole = ({ userId, currentRole, userName, onSuccessfullRoleChanged }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const changeRoleTo = currentRole == 'user' ? 'admin' : "user";

    const handleAcceptance = (accepted) => {
        if (accepted) {
            changeRole();
        }
        setShowPrompt(false);
    };

    const changeRole = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/role-update/${userId}?changeRoleTo=${changeRoleTo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include',
            })
            const data = await response.json();
            if (data.success) {
                toast.success("User's role updated successfully");
                onSuccessfullRoleChanged()
            } else {
                console.log(data);
                toast.error(data.message || 'Error updating user role');
            }
        } catch (e) {
            console.log(e);
            toast.error('Error updating user role');
        }
    }
    return (
        <>
            <Button styles='text-xs px-2 py-1 whitespace-nowrap rounded-md flex-1' title={`Make ${changeRoleTo}`} onclicks={() => setShowPrompt(true)} />
            <WarningPrompt
                visibility={showPrompt}
                warningMessage={<p>Are you sure you want to change <b>{userName}'s</b> role to <b><i>{changeRoleTo.toUpperCase()}</i></b>?</p>}
                onClose={(val) => setShowPrompt(val)}
                onAcceptance={handleAcceptance}
            />
        </>
    )
}

export default ChangeRole