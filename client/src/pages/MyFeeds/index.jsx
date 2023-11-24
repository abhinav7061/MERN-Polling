import React, { useState, useEffect } from 'react'
import VoteItem from '../../components/VoteItem'
import { Spinner } from '../../components/Loader/SpinLoader';
import styles from '../../styles';

const apiUrl = import.meta.env.VITE_API_URL;

const MyFeeds = () => {
    const perPage = 5;
    const [feeds, setFeeds] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newer');
    const getPolls = async () => {
        try {
            const res = await fetch(`${apiUrl}/poll/allPolls?page=${encodeURIComponent(page)}&search=${encodeURIComponent(search)}&sort=${sort}`);
            const data = await res.json();
            if (data.polls.length < perPage) setHasMore(false);
            setFeeds(prevItems => [...new Set([...prevItems, ...data.polls])]);
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
        <div className='flex lg:flex-row flex-col-reverse'>
            <div className='flex flex-col flex-1'>
                {
                    feeds.length > 0 ? feeds.map((feed, index) => (
                        <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2" key={index}>
                            <VoteItem pollData={feed} />
                        </div>
                    )) : <div>{!loading && <h1 className='text-center text-base lg:text-xl font-semibold'>No Feeds Found</h1>}</div>
                }
                {
                    // feeds.length === 0 && <h1 className='text-center text-base lg:text-xl font-semibold'>No Feeds Found</h1>
                }
                {
                    (loading && hasMore) && <div className='flex justify-center items-center'><Spinner /></div>
                }
                {
                    (!hasMore && feeds.length > 0) && <h1 className='text-center text-base lg:text-xl font-semibold'>You have Reached to end</h1>
                }
            </div>
            <div className={`lg:ml-7 lg:pl-7 lg:border-l lg:border-slate-400 flex lg:flex-col justify-between lg:justify-start mb-5 lg:mb-0 flex-wrap gap-3 lg:w-[250px] ${styles.heading6}`}>
                {/* Input for search */}
                <input
                    type="text"
                    placeholder="Search Poll"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='border-2 border-slate-400 px-3 sm:px-5 lg:py-1 py-0 outline-none focus:border-slate-600 rounded-3xl flex-1 lg:flex-none'
                />

                {/* Dropdown for sorting */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={`lg:mt-4 ${styles.heading6} font-bold px-3 py-2 rounded-3xl bg-slate-400`}
                >
                    <option value="newer">Newer</option>
                    <option value="older">Older</option>
                    <option value="likes">Likes</option>
                    <option value="votes">Votes</option>
                </select>

                {/* Button to trigger API call */}
                <button onClick={() => {
                    setFeeds([]);
                    setPage(1);
                    setHasMore(true)
                    setLoading(true)
                    setTimeout(() => {
                        getPolls()
                    }, 30);
                }} className={`px-2 md:px-3 py-1 rounded-md  text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors font-semibold lg:mt-5`}>Get Polls</button>
            </div>
        </div>
    )
}

export default MyFeeds