import React, { useState, useEffect } from 'react'
import VoteItem from '../../components/VoteItem'
import { Spinner } from '../../components/Loader/SpinLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const MyFeeds = () => {
    const perPage = 5;
    const [feeds, setFeeds] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)

    const getPolls = async () => {
        try {
            const res = await fetch(`${apiUrl}/poll//allPolls?page=${page}`);
            const data = await res.json();
            if (data.polls.length < perPage) setHasMore(false);
            setFeeds(prevItems => [...prevItems, ...data.polls]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (hasMore) {
            getPolls()
        }
    }, [page])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            // Load more data when scrolled to the bottom
            setLoading(true);
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='flex flex-col'>
            {
                feeds && feeds.map((feed, index) => (
                    <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2" key={index}>
                        <VoteItem pollData={feed} />
                    </div>
                ))
            }
            {
                (loading && hasMore) && <div className='flex justify-center items-center'><Spinner /></div>
            }
            {
                !hasMore && <h1 className='text-center text-base lg:text-xl font-semibold'>You have Reached to end</h1>
            }
        </div>
    )
}

export default MyFeeds