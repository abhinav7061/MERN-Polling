import React, { useState } from 'react';
import usePolls from '../../../Hooks/usePolls';
import PollList from '../../../components/PollList';
import SearchSort from '../../../components/SearchSort';
import styles from '../../../styles';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const MyPolls = () => {
    const { feeds, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls, searchPlaceholder } = usePolls(`${apiUrl}/poll/myPolls`);
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
            <PollList feeds={feeds} loading={loading} hasMore={hasMore} role='polls' customMessage={searchPlaceholder || active ? `You have Zero votes ${searchPlaceholder ? `which contains '${searchPlaceholder}'and` : ''} ${active ? `which is ${active}` : null}` : 'You have ZERO poll'} />
            <SearchSort
                search={search}
                sort={sort}
                setSearch={setSearch}
                setSort={setSort}
                onSearchSortSubmit={handleSearchSortSubmit}
                searchPlaceholder={searchPlaceholder}
            >
                <select
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                    className={`lg:mt-4 ${styles.heading6} font-bold px-3 py-2 rounded-3xl bg-slate-400`}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="closed">Cloded</option>
                </select>
            </SearchSort>
        </div>
    );
};

export default MyPolls;
