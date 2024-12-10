import React from 'react';
import usePolls from '../../Hooks/usePolls';
import PollList from '../PollList';
import SearchSort from '../SearchSort';
import { useLocation } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage';

const apiUrl = import.meta.env.VITE_API_URL;

const PollPageTemplate = ({ apiRoute, type = 'polls' }) => {
    const { feeds, setFeeds, errorMessage, loading, hasMore, search, sort, active, setSearch, setSort, setActive, resetPolls, searchPlaceholder, lastActiveSorted } = usePolls(`${apiUrl}/${apiRoute}`);
    const location = useLocation();
    if (location.state !== null && location.state?.active) {
        setActive(location.state.active);
        location.state = null;
    }

    const handleSearchSortSubmit = (e) => {
        e.preventDefault();
        resetPolls();
    };

    if (errorMessage) {
        return <div className='min-h-screen flex items-center justify-center'><ErrorMessage heading={`Error fetching the ${type}`} message={errorMessage} action={resetPolls} /></div>
    }

    return (
        <div className='flex xl:flex-row gap-6 flex-col-reverse'>
            <PollList
                feeds={feeds}
                setFeeds={setFeeds}
                loading={loading}
                hasMore={hasMore}
                role='feeds'
                customMessage={searchPlaceholder ? `There are no ${type} which contains '${searchPlaceholder}'` : `There are zero ${lastActiveSorted != 'all' ? lastActiveSorted : ''} ${type}`}
            />
            <SearchSort
                search={search}
                sort={sort}
                active={active}
                setSearch={setSearch}
                setSort={setSort}
                setActive={setActive}
                onSearchSortSubmit={handleSearchSortSubmit}
                searchPlaceholder={searchPlaceholder}
            />
        </div>
    );
};

export default PollPageTemplate;
