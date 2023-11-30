import React, { useState } from 'react';
import usePolls from '../../../Hooks/usePolls';
import PollList from '../../../components/PollList';
import SearchSort from '../../../components/SearchSort';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const MyVotes = () => {
    const { feeds, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls, searchPlaceholder } = usePolls(`${apiUrl}/vote/myVotes`);
    const location = useLocation();
    if (location.state !== null) {
        setActive(location.state.active);
        location.state = null;
    }

    const handleSearchSortSubmit = (e) => {
        e.preventDefault();
        resetPolls();
    };

    return (
        <div className='flex lg:flex-row flex-col-reverse'>
            <PollList feeds={feeds} loading={loading} hasMore={hasMore} role='vote' customMessage={searchPlaceholder ? `You have Zero votes which contains '${searchPlaceholder}'` : 'You have ZERO votes'} />
            <SearchSort
                search={search}
                sort={sort}
                setSearch={setSearch}
                setSort={setSort}
                onSearchSortSubmit={handleSearchSortSubmit}
                searchPlaceholder={searchPlaceholder}
            />
        </div>
    );
};

export default MyVotes;
