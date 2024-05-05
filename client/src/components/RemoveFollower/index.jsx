import React, { useState } from 'react'
import { toast } from 'sonner';

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const RemoveFollower = ({ userToRemove, callback }) => {
    const [loading, setLoading] = useState(false);
    const RemoveFollower = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/followers_followings/removeFollower/${userToRemove}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok && data.success) {
                toast.success('Successfully Removed!');
                callback();
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <span className=" flex gap-1 items-center hover:text-red-700 px-2 py-1 hover:bg-red-100 rounded-md cursor-pointer" onClick={RemoveFollower}>
            {loading ? <span>Wait...</span> : <><ion-icon name="remove-circle-outline"></ion-icon> Remove</>}
        </span>
    )
}

export default RemoveFollower