import React, { useState } from 'react'
import { toast } from 'sonner';

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const Unfollow = ({ userToUnfollow, callback }) => {
    const [loading, setLoading] = useState(false);
    const unFollowUser = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/followers_followings/unFollow/${userToUnfollow}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok && data.success) {
                toast.success('Successfully unFollowed!');
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
        <span className=" flex gap-1 items-center hover:text-red-700 px-2 py-1 hover:bg-red-100 rounded-md cursor-pointer" onClick={unFollowUser}>
            {loading ? <span>Wait...</span> : <><ion-icon name="close-circle-outline"></ion-icon> Unfollow</>}
        </span>
    )
}

export default Unfollow