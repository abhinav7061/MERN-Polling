import React, { useState, useEffect } from 'react'
import VoteItem from '../../components/VoteItem'

const apiUrl = import.meta.env.VITE_API_URL;

const MyFeeds = () => {
    const [feeds, setFeeds] = useState([])
    const getPolls = async() => {
        const res = await fetch(`${apiUrl}/poll/`)
    }
    return (
        <div className='flex flex-col'>
            <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2">
                <VoteItem />
            </div>
            <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2">
                <VoteItem />
            </div>
            <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2">
                <VoteItem />
            </div>
        </div>
    )
}

export default MyFeeds