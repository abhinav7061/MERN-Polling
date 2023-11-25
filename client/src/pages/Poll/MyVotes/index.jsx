import React, { useState } from 'react';
import usePolls from '../../../Hooks/usePolls';
import PollList from '../../../components/PollList';
import SearchSort from '../../../components/SearchSort';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const MyVotes = () => {
    const { feeds, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls } = usePolls(`${apiUrl}/vote/myVotes`);
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
            <PollList feeds={feeds} loading={loading} hasMore={hasMore} role='votes' />
            <SearchSort
                search={search}
                sort={sort}
                // filter={filter}
                setSearch={setSearch}
                setSort={setSort}
                // setFilter={setFilter}
                onSearchSortSubmit={handleSearchSortSubmit}
            />
        </div>
    );
};

export default MyVotes;
