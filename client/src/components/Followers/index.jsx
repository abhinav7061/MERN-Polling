// Followers.js
import React from 'react';
import { useFollowers } from '../../contexts/FollowersContext';
import FollowerFollowingList from '../FollowerFollowing/FollowerFollowingList';

const Followers = ({ userId, userName = "you" }) => {
    const {
        followers: users,
        setFollowers: setUsers,
        totalFollowers: totalUsers,
        followersPage: usersPage,
        setFollowersPage: setUsersPage,
        followersHasMore: usersHasMore,
        setFollowersHasMore: setUsersHasMore,
        followersLoading: usersLoading,
        fetchFollowersErrorMessage: fetchUsersErrorMessage,
        fetchFollowers: fetchUsers,
    } = useFollowers();

    return (
        <FollowerFollowingList
            userId={userId}
            userName={userName}
            title="Followers"
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

export default Followers;
