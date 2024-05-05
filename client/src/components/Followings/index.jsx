import React, { useEffect, useState } from 'react'
import styles from '../../styles';
import UserDescription from '../UserDescription';
import { formatDistanceToNow } from 'date-fns';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import Unfollow from '../UnFollow';

const apiUrl = import.meta.env.VITE_API_URL;

const Followings = () => {
    const [followings, setFollowings] = useState([]);
    const [totalFollowings, setTotalFollowings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 5;

    const getFollowings = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/followers_followings/followings?page=${encodeURIComponent(page)}&&pageSize=${encodeURIComponent(pageSize)}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setFollowings(prevItems => [...new Set([...prevItems, ...data.followings])]);
                setTotalFollowings(data.totalFollowings);
                if (data.followings.length < pageSize) setHasMore(false);
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
            getFollowings();
        }
    }, [page, hasMore])

    const callBack = (index) => {
        const updatedFollowings = [...followings];
        // Remove the item at the specified index
        updatedFollowings.splice(index, 1);

        setFollowings(updatedFollowings);
        setTotalFollowings(pre => pre - 1)
    }

    return (
        <div className='flex-1 bg-white p-8 rounded-xl h-fit  max-h-screen overflow-auto'>
            <h2 className={`text-center ${styles.heading4} font-bold mb-4 underline`}>
                Followings
            </h2>
            <h1 className='my-3'>Total Number of Followings: {totalFollowings}</h1>
            <div className='flex flex-col gap-3'>
                {
                    followings.map((item, index) =>
                    (<div className='p-2 border shadow-sm shadow-black rounded-lg' key={item.followingId._id} title={`You Follow ${item.followingId.name} since ${formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}.`}>
                        <UserDescription userId={item.followingId._id} >
                            <span title={`UnFollow ${item.followingId.name}`} className={`${styles.heading6} bg-gray-300 rounded-md`}><Unfollow userToUnfollow={item.followingId._id} callback={() => callBack(index)} /></span>
                        </UserDescription>
                    </div>)
                    )
                }
                <div className={`${styles.heading6} flex w-full justify-center`}>
                    {
                        loading ? <SmallSpinLoader /> : (<>
                            {hasMore ? <div className='cursor-pointer duration-500 hover:bg-sky-300 transition-colors rounded-md  px-2 md:px-3 py-1' onClick={() => setPage(prevPage => prevPage + 1)}>loadMore</div> : <div className=''>No More Followings</div>}
                        </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Followings