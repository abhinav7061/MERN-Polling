import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Spinner } from '../Loader/SpinLoader';
import VoteItem from '../VoteItem';
import { pollMessage } from '../../constants';
import styles from './index.module.css';

const PollList = ({ feeds, setFeeds, loading, hasMore, role, customMessage }) => {
    const message = customMessage || pollMessage[role] || 'No Feeds Found';

    const deletePoll = (pollId) => {
        setFeeds((prevPolls) => prevPolls.filter((poll) => poll._id !== pollId));
    };

    return (
        <div className='flex flex-col flex-1'>
            <TransitionGroup>
                {feeds.length > 0 &&
                    feeds.map((feed) => (
                        <CSSTransition
                            key={feed._id}
                            timeout={500}
                            classNames={{
                                enter: styles['bounce-enter'],
                                enterActive: styles['bounce-enter-active'],
                                exit: styles['bounce-exit'],
                                exitActive: styles['bounce-exit-active'],
                            }}
                        >
                            <div
                                className={`bg-white rounded-[10px] overflow-hidden mb-4 px-2 py-1 md:px-6 md:py-2 relative ${styles.poll_item}`}>
                                <VoteItem pollData={feed} role={role} deletePollCallback={deletePoll} />
                            </div>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
            {(loading && hasMore) ? (
                <div className='flex justify-center items-center'>
                    <Spinner />
                </div>
            ) : (feeds.length === 0) ? (
                <h1 className='text-center text-base lg:text-xl font-semibold'>{message}</h1>
            ) : <h1 className='text-center text-base lg:text-xl font-semibold'>You have Reached the end</h1>}
        </div>
    );
}

export default PollList;
