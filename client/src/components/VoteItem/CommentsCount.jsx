import React, { useState, useEffect } from 'react'

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const CommentsCount = ({ pollId }) => {
    const [counts, setCounts] = useState(0);
    const getCount = async () => {
        try {
            const res = await fetch(`${apiUrl}/comment/commentCount/${pollId}`);
            const data = await res.json();
            if (res.ok && data.success) {
                setCounts(data.count);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching comment count:', error.message);
        }
    };

    useEffect(() => {
        getCount();
    }, [])

    return (
        <div className="hover:underline cursor-pointer">{counts} Comment</div>
    )
}

export default CommentsCount