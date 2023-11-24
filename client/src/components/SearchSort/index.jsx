import React from 'react';
import styles from '../../styles';

const SearchSort = ({ search, sort, setSearch, setSort, onSearchSortSubmit, children }) => {
    return (
        <form className={`lg:ml-7 lg:pl-7 lg:border-l lg:border-slate-400 flex lg:flex-col justify-between lg:justify-start mb-5 lg:mb-0 flex-wrap gap-3 lg:w-[250px] ${styles.heading6}`} onSubmit={onSearchSortSubmit}>
            {/* Input for search */}
            <input
                type="text"
                placeholder="Search Poll"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border-2 border-slate-400 px-3 sm:px-5 lg:py-1 py-0 outline-none focus:border-slate-600 rounded-3xl flex-1 lg:flex-none'
            />

            {/* Dropdown for sorting */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`lg:mt-4 ${styles.heading6} font-bold px-3 py-2 rounded-3xl bg-slate-400`}
            >
                <option value="newer">Newer</option>
                <option value="older">Older</option>
                <option value="likes">Likes</option>
                <option value="votes">Votes</option>
            </select>
            {children}

            {/* Button to trigger search and sort */}
            <button
                className={`px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors font-semibold lg:mt-5`}
                type='submit'
            >
                Get Polls
            </button>
        </form>
    );
};

export default SearchSort;
