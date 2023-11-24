import React from 'react';
import usePolls from '../../Hooks/usePolls';
import PollList from '../../components/PollList';
import SearchSort from '../../components/SearchSort';

const apiUrl = import.meta.env.VITE_API_URL;

const MyPolls = () => {
    const { feeds, loading, hasMore, search, sort, setSearch, setSort, resetPolls } = usePolls(`${apiUrl}/poll/allPolls`);

    const handleSearchSortSubmit = (e) => {
        e.preventDefault();
        resetPolls();
    };

    return (
        <div className='flex lg:flex-row flex-col-reverse'>
            <PollList feeds={feeds} loading={loading} hasMore={hasMore} />
            <SearchSort
                search={search}
                sort={sort}
                setSearch={setSearch}
                setSort={setSort}
                onSearchSortSubmit={handleSearchSortSubmit}
            />
        </div>
    );
};

export default MyPolls;
