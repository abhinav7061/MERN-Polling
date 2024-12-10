import React, { useState, useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import Table from './table'
import Pagination from './pagination'
import debounce from '../../utilities/debounce'

const PaginatedTable = ({ data, columns, loading, itemsPerPage, totalItems, currentPage, setCurrentPage, setItemPerPage, search, setSearch }) => {
    const numberOfPages = Math.ceil(totalItems / itemsPerPage);
    const [pageNo, setPageNo] = useState(currentPage);
    const [selectOptions, setsSelectOptions] = useState([5, 10, 15, 20, 30, 50, 80, 100]);
    const [inputVal, setInputVal] = useState(search);
    const debouncedSetCurrentPage = useCallback(
        debounce((newValue) => {
            setCurrentPage(newValue);
        }, 500),
        [setCurrentPage]
    );

    const debouncedSetSearch = useCallback(
        debounce((newValue) => {
            setSearch(newValue);
        }, 500),
        [setSearch]
    );

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (!newValue || newValue === '0') {
            setPageNo(1);
            debouncedSetCurrentPage(1);
        } else {
            const parsedValue = parseInt(newValue, 10);
            if (parsedValue < 1) {
                setPageNo(1);
                debouncedSetCurrentPage(1);
            } else if (parsedValue > numberOfPages) {
                setPageNo(numberOfPages);
                debouncedSetCurrentPage(numberOfPages);
            } else {
                setPageNo(parsedValue);
                debouncedSetCurrentPage(parsedValue);
            }
        }
    };
    const handleSearchValChange = (event) => {
        setInputVal(event.target.value);
        debouncedSetSearch(event.target.value);
    }

    useEffect(() => {
        if (!selectOptions.includes(itemsPerPage)) {
            const items = selectOptions;
            items.push(itemsPerPage);
            items.sort((a, b) => a - b);
            setsSelectOptions(items);
        }
        return () => {
            debouncedSetCurrentPage.cancel();
            debouncedSetSearch.cancel();
        }
    }, [])
    return (
        <>
            <div className=' mt-2 overflow-scroll border border-slate-300 rounded-lg w-[calc(100vw-20px)] sm:w-[calc(100vw-300px)] md:w-[calc(100vw-365px)] lg:w-[calc(100vw-400px)] max-w-7xl'>
                <div className='flex justify-between w-full sticky top-0 left-0 p-3'>
                    <span className='flex gap-2'>
                        <input type='number' placeholder='Enter page number' value={pageNo} onChange={handleChange} className='flex border border-slate-300 rounded-md px-1 xs:px-2 xs:py-1' min="1" max={numberOfPages} />
                        <select value={itemsPerPage} onChange={(e) => setItemPerPage(e.target.value)} className='flex border border-slate-300 rounded-md px-1 xs:px-2 xs:py-1'>
                            {selectOptions.map((option, i) => (<option key={i} value={option}>{option}</option>))}
                        </select>
                    </span>
                    <input type='text' placeholder='Search' value={inputVal} onChange={handleSearchValChange} className='border border-slate-300 rounded-md px-1 xs:px-2 xs:py-1 w-40 md:w-auto' />
                </div>
                <Table data={data} columns={columns} loading={loading} />
            </div>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setItemPerPage={setItemPerPage}
                numberOfPages={numberOfPages}
            />
        </>
    )
}

export default PaginatedTable