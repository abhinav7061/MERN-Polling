import React, { useState, useEffect } from 'react'
import VoteItem from '../../components/VoteItem'

const apiUrl = import.meta.env.VITE_API_URL;

const MyFeeds = () => {
    const [feeds, setFeeds] = useState([])
    const [page, setPage] = useState(1);
    const getPolls = async () => {
        try {
            const res = await fetch(`${apiUrl}/poll//getAllPolls?page=${page}`);
            const data = await res.json();
            setFeeds(prevItems => [...prevItems, ...data.polls]);
            console.log({ data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getPolls()
    }, [page])
    useEffect(()=>{
        console.log({feeds});
    },[feeds])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            // Load more data when scrolled to the bottom
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
        </div>
    )
}

export default MyFeeds