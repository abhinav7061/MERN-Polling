import React, { createContext, useState, useContext } from 'react';
import getLocalValue from '../utilities/handleLocalStorage';
const apiUrl = import.meta.env.VITE_API_URL;
const FollowersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
    const [followers, setFollowers] = useState([]);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [followersPage, setFollowersPage] = useState(1);
    const [followersHasMore, setFollowersHasMore] = useState(true);
    const [followersLoading, setFollowersLoading] = useState(false);
    const [fetchFollowersErrorMessage, setFetchFollowersErrorMessage] = useState(null)

    const fetchFollowers = async (userId, page, pageSize = 5) => {
        setFollowersLoading(true);
        setFetchFollowersErrorMessage(null);
        try {
            const res = await fetch(`${apiUrl}/followers_followings/followers/${userId}?page=${page}&&pageSize=${pageSize}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFollowers(prev => [...prev, ...data.followers]);
                setTotalFollowers(data.totalFollowers);
                if (data.followers.length < pageSize) setFollowersHasMore(false);
            } else {
                throw new Error(data?.message || "Server Error");
            }
        } catch (error) {
            console.error(error);
            setFetchFollowersErrorMessage(error.message);
        } finally {
            setFollowersLoading(false);
        }
    };

    return (
        <FollowersContext.Provider value={{ followers, setFollowers, totalFollowers, followersPage, setFollowersPage, followersHasMore, setFollowersHasMore, followersLoading, fetchFollowersErrorMessage, fetchFollowers }}>
            {children}
        </FollowersContext.Provider>
    );
};

export const useFollowers = () => useContext(FollowersContext);
