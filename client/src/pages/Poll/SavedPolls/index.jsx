import React, { useState } from 'react';
import usePolls from '../../../Hooks/usePolls';
import PollList from '../../../components/PollList';
import SearchSort from '../../../components/SearchSort';
import styles from '../../../styles';
import ErrorMessage from '../../../components/ErrorMessage';

const apiUrl = import.meta.env.VITE_API_URL;

const SavedPolls = () => {
    const { feeds, setFeeds, errorMessage, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls, searchPlaceholder } = usePolls(`${apiUrl}/save-poll/saved-polls`);

    const handleSearchSortSubmit = (e) => {
        e.preventDefault();
        resetPolls();
    };

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the saved polls" message={errorMessage} action={() => { resetPolls(); console.log("clicked refress") }} /></div>
    }

    return (
        <div className='flex lg:flex-row gap-6 flex-col-reverse'>
            <PollList feeds={feeds} setFeeds={setFeeds} loading={loading} hasMore={hasMore} customMessage={searchPlaceholder ? `You have Zero Saved Polls which contains '${searchPlaceholder}'` : 'You have ZERO saved polls'} />
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

export default SavedPolls;
