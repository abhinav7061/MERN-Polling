// GenericUserList.js
import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../../styles';
import UserDescription from '../UserDescription';
import { formatDistanceToNow } from 'date-fns';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import ErrorMessage from '../ErrorMessage';
import { UserContext } from '../../contexts/UserContext';
import FollowerFollowingAction from './FollowerFollowingAction';
import animation from './index.module.css'

const FollowerFollowingList = ({
    userId,
    userName,
    title,
    fetchUsers,
    users,
    setUsers,
    totalUsers,
    usersPage,
    setUsersPage,
    usersHasMore,
    setUsersHasMore,
    usersLoading,
    fetchUsersErrorMessage,
}) => {
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        setUsers([]);
        setUsersPage(1);
        setUsersHasMore(true);
    }, []);

    useEffect(() => {
        if (usersHasMore) {
            fetchUsers(userId, usersPage);
        }
    }, [usersPage, usersHasMore]);

    return (
        <div className='flex-1 bg-white p-8 rounded-xl h-fit max-h-screen overflow-auto'>
            <h2 className={`text-center ${styles.heading4} font-bold mb-4 underline`}>
                {title}
            </h2>
            {fetchUsersErrorMessage ? (
                <ErrorMessage
                    heading={`Error Fetching ${title}`}
                    message={fetchUsersErrorMessage}
                    action={() => {
                        if (usersPage === 1) fetchUsers(userId, usersPage);
                        else setUsersPage(1);
                    }}
                />
            ) : (
                <>
                    <h1 className='my-3'>Total Number of {title}: {totalUsers}</h1>
                    <div className='flex flex-col gap-3'>
                        <TransitionGroup className='flex flex-col gap-3'>
                            {/* <TransitionGroup> */}
                            {users.map(user => (
                                <CSSTransition
                                    key={user._id}
                                    timeout={500}
                                    classNames={{
                                        enter: animation['fade-slide-enter'],
                                        enterActive: animation['fade-slide-enter-active'],
                                        exit: animation['fade-slide-exit'],
                                        exitActive: animation['fade-slide-exit-active'],
                                    }}
                                >
                                    <div
                                        className={`p-2 border shadow-sm shadow-black rounded-lg ${animation.followers_followings_item}`}
                                        title={` ${userName} Follow ${userInfo._id === user._id ? 'you' : user.name} since ${formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}.`}
                                    >
                                        <UserDescription userId={user._id}>
                                            <FollowerFollowingAction userId={user._id} userName={user.name} profileUserId={userId} />
                                        </UserDescription>
                                    </div>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>


                        <div className={`${styles.heading6} flex w-full justify-center`}>
                            {usersLoading ? (
                                <SmallSpinLoader />
                            ) : (
                                <>
                                    {usersHasMore ? (
                                        <div
                                            className='cursor-pointer duration-500 hover:bg-sky-300 transition-colors rounded-md px-2 md:px-3 py-1'
                                            onClick={() => setUsersPage(prevPage => prevPage + 1)}
                                        >
                                            Load More
                                        </div>
                                    ) : (
                                        <div>No More {title}</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FollowerFollowingList;
