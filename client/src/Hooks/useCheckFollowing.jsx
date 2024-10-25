import React, { useState } from 'react'
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const useCheckFollowing = ({ followerId, followingId }) => {
    const [isFollower, setIsFollower] = useState(false);
    const [loading, setLoading] = useState(false);
    const checkFollowing = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/followers_followings/checkFollowing?followerId=${encodeURIComponent(followerId)}&followingId=${encodeURIComponent(followingId)}`, { credentials: 'include' });
            const data = await response.json();
            if (data.success) {
                setIsFollower(data.following);
            } else {
                throw new Error(data?.message || "Server Error")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return { isFollower, loading, checkFollowing }
}

export default useCheckFollowing;