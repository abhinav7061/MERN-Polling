import React, { createContext, useState, useContext } from 'react';
import getLocalValue from '../utilities/handleLocalStorage';
const apiUrl = import.meta.env.VITE_API_URL;
const FollowingsContext = createContext();

export const FollowingsContextProvider = ({ children }) => {
    const [followings, setFollowings] = useState([]);
    const [totalFollowings, setTotalFollowings] = useState(0);
    const [followingsPage, setFollowingsPage] = useState(1);
    const [followingsHasMore, setFollowingsHasMore] = useState(true);
    const [followingsLoading, setFollowingsLoading] = useState(false);
    const [fetchFollowingErrorMessage, setFetchFollowingErrorMessage] = useState(null)

    const fetchFollowings = async (userId, page, pageSize = 5) => {
        setFollowingsLoading(true);
        setFetchFollowingErrorMessage(null);
        try {
            const res = await fetch(`${apiUrl}/followers_followings/followings/${userId}?page=${page}&pageSize=${pageSize}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getLocalValue('token')}`,
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFollowings(prev => [...prev, ...data.followings]);
                setTotalFollowings(data.totalFollowings);
                if (data.followings.length < pageSize) setFollowingsHasMore(false);
            } else {
                throw new Error(data?.message || "Server Error");
            }
        } catch (error) {
            console.error(error);
            setFetchFollowingErrorMessage(error.message);
        } finally {
            setFollowingsLoading(false);
        }
    };

    return (
        <FollowingsContext.Provider value={{ followings, setFollowings, totalFollowings, followingsPage, setFollowingsPage, followingsHasMore, setFollowingsHasMore, followingsLoading, fetchFollowingErrorMessage, fetchFollowings }}>
            {children}
        </FollowingsContext.Provider>
    );
};

export const useFollowings = () => useContext(FollowingsContext);
