import React, { useEffect, useState } from 'react'
import styles from '../../styles';
import UserDescription from '../UserDescription';
import { formatDistanceToNow } from 'date-fns';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import RemoveFollower from '../RemoveFollower';

const apiUrl = import.meta.env.VITE_API_URL;
const pageSize = import.meta.env.VITE_PAGE_SIZE;

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [totalFollowers, setTotalFollowers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const getFollowers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/followers_followings/followers?page=${encodeURIComponent(page)}&&pageSize=${encodeURIComponent(pageSize)}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFollowers(prevItems => [...new Set([...prevItems, ...data.followers])]);
                setTotalFollowers(data.totalFollowers);
                if (data.followers.length < pageSize) setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (hasMore) {
            getFollowers();
        }
    }, [page, hasMore])

    const callBack = (index) => {
        const updatedFollowers = [...followers];
        // Remove the item at the specified index
        updatedFollowers.splice(index, 1);

        setFollowers(updatedFollowers);
        setTotalFollowers(pre => pre - 1)
    }
    return (
        <div className='flex-1 bg-white p-8 rounded-xl h-fit max-h-screen overflow-auto'>
            <h2 className={`text-center ${styles.heading4} font-bold mb-4 underline`}>
                Followers
            </h2>
            <h1 className='my-3'>Total Number of Followers: {totalFollowers}</h1>
            <div className='flex flex-col gap-3'>
                {
                    followers.map((item, index) =>
                    (<div className='p-2 border shadow-sm shadow-black rounded-lg' key={item.followerId._id} title={`${item.followerId.name} Follows You since ${formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}.`}>
                        <UserDescription userId={item.followerId._id} >
                            <span className={`${styles.heading6} rounded-md bg-slate-300`} title={`Remove ${item.followerId.name}`}><RemoveFollower userToRemove={item.followerId._id} callback={() => callBack(index)} /></span>
                        </UserDescription>
                    </div>)
                    )
                }
                <div className={`${styles.heading6} flex w-full justify-center`}>
                    {
                        loading ? <SmallSpinLoader /> : (<>
                            {hasMore ? <div className='cursor-pointer duration-500 hover:bg-sky-300 transition-colors rounded-md  px-2 md:px-3 py-1' onClick={() => setPage(prevPage => prevPage + 1)}>loadMore</div> : <div className=''>No More Followers</div>}
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Followers