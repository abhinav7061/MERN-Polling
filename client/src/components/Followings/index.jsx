// Followings.js
import React from 'react';
import { useFollowings } from '../../contexts/FollowingsContext';
import FollowerFollowingList from '../FollowerFollowing/FollowerFollowingList';

const Followings = ({ userId, userName = "You" }) => {
    const {
        followings: users,
        setFollowings: setUsers,
        totalFollowings: totalUsers,
        followingsPage: usersPage,
        setFollowingsPage: setUsersPage,
        followingsHasMore: usersHasMore,
        setFollowingsHasMore: setUsersHasMore,
        followingsLoading: usersLoading,
        fetchFollowingErrorMessage: fetchUsersErrorMessage,
        fetchFollowings: fetchUsers,
    } = useFollowings();

    return (
        <FollowerFollowingList
            userId={userId}
            userName={userName}
            title="Followings"
            fetchUsers={fetchUsers}
            users={users}
            setUsers={setUsers}
            totalUsers={totalUsers}
            usersPage={usersPage}
            setUsersPage={setUsersPage}
            usersHasMore={usersHasMore}
            setUsersHasMore={setUsersHasMore}
            usersLoading={usersLoading}
            fetchUsersErrorMessage={fetchUsersErrorMessage}
        />
    );
};

export default Followings;
