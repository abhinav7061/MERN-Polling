import React from 'react';
import { Spinner } from '../Loader/SpinLoader';
import VoteItem from '../VoteItem';

const PollList = ({ feeds, loading, hasMore, role }) => {
    let message = 'No Feeds Found';
    if (role === 'votes') {
        message = 'You have ZERO votes'
    }
    if (role === 'polls') {
        message = 'You have ZERO poll'
    }

    return (<div className='flex flex-col flex-1'>
        {feeds.length > 0 ? (
            feeds.map((feed, index) => (
                <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2" key={index}>
                    <VoteItem pollData={feed} role={role}/>
                </div>
            ))
        ) : (
            <div>{!loading && <h1 className='text-center text-base lg:text-xl font-semibold'>{message}</h1>}</div>
        )}
        {(loading && hasMore) && <div className='flex justify-center items-center'><Spinner /></div>}
        {(!hasMore && feeds.length > 0) && <h1 className='text-center text-base lg:text-xl font-semibold'>You have Reached to end</h1>}
    </div>)
}

export default PollList;
