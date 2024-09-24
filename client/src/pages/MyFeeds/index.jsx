import React from 'react';
import usePolls from '../../Hooks/usePolls';
import PollList from '../../components/PollList';
import SearchSort from '../../components/SearchSort';
import ErrorMessage from '../../components/ErrorMessage';

const apiUrl = import.meta.env.VITE_API_URL;

const MyPolls = () => {
    const { feeds, setFeeds, errorMessage, loading, hasMore, search, sort, setSearch, setSort, resetPolls, searchPlaceholder } = usePolls(`${apiUrl}/poll/allPolls`);

    const handleSearchSortSubmit = (e) => {
        e.preventDefault();
        resetPolls();
    };

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading="Error fetching the dashoard" message={errorMessage} action={resetPolls} /></div>
    }

    return (
        <div className='flex lg:flex-row gap-6 flex-col-reverse'>
            <PollList feeds={feeds} setFeeds={setFeeds} loading={loading} hasMore={hasMore} role='feeds' customMessage={searchPlaceholder ? `There are no feed/poll which contains '${searchPlaceholder}'` : 'You have ZERO poll'} />
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

export default MyPolls;
