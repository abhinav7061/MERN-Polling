import React from 'react';
import styles from '../../styles';

const SearchSort = ({ search, sort, setSearch, setSort, onSearchSortSubmit, children, searchPlaceholder }) => {
    return (
        <form className={`xl:border-l xl:border-slate-400 flex xl:flex-col justify-between xl:justify-start xl:mb-0 xs:gap-3 gap-1 ${styles.heading6} h-auto xl:h-screen backdrop-blur-sm overflow-y-auto overflow-x-hidden sticky top-0 left-0  py-2 ps-10 pe-2 sm:ps-0 sm:pe-0 xl:ps-7`} onSubmit={onSearchSortSubmit}>
            {/* Input for search */}
            <input
                type="text"
                placeholder={searchPlaceholder || 'Search Poll'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border-2 border-slate-400 w-10 xl:w-auto px-3 sm:px-5 xl:py-2 py-1 outline-none focus:border-slate-600 rounded-3xl flex-1 xl:flex-none min-w-0'
            />

            {/* Dropdown for sorting */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`xl:mt-4 ${styles.heading6} outline-none font-bold px-3 py-2 rounded-3xl bg-slate-400 cursor-pointer`}
            >
                <option value="newer">Newer</option>
                <option value="older">Older</option>
                <option value="likes">Likes</option>
                <option value="votes">Votes</option>
            </select>
            {children}

            {/* Button to trigger search and sort */}
            <button
                className={`px-2 whitespace-nowrap md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors font-semibold xl:mt-5`}
                type='submit'
            >
                Get Polls
            </button>
        </form>
    );
};

export default SearchSort;
