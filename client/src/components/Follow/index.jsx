import React, { useState } from 'react'
import { toast } from 'sonner';

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const Follow = ({ userToFollow, callback }) => {

    const [loading, setLoading] = useState(false);
    const followUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/user/follow/${userToFollow}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Successfully followed!');
                callback();
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <span className=" flex gap-1 items-center hover:text-green-700 px-2 py-1 hover:bg-green-100 rounded-md cursor-pointer" onClick={followUser}>
            {loading ? <span>Wait...</span> : <><ion-icon name="add-circle-outline"></ion-icon> Follow</>}
        </span>
    )
}

export default Follow