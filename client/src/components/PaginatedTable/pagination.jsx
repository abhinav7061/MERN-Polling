import React, { useState } from 'react'
import getPaginationRange from '../../utilities/getPaginationRange';

const Pagination = ({ itemsPerPage, totalItems, currentPage, setCurrentPage, numberOfPages }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginationRange = getPaginationRange(numberOfPages, currentPage);
    return (
        <nav className="flex items-center w-full flex-wrap justify-between p-4 gap-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-800 sm:mb-0 block w-full sm:inline sm:w-auto">
                Showing <span className="font-semibold text-gray-900">{totalItems == 0 ? 0 : `${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, totalItems)}`}</span> of <span className="font-semibold text-gray-900">{totalItems}</span>
            </span>
            {totalItems != 0 && <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li>
                    <button onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1} className={`flex items-center justify-center h-8 leading-tight p-1 ps-[2px] bg-transparent rounded-lg ${currentPage == 1 ? 'text-gray-600' : 'hover:bg-slate-700 hover:text-white'}`}>
                        <p className='text-2xl flex transform rotate-180'><ion-icon name="caret-forward-outline"></ion-icon></p>
                    </button>
                </li>
                {paginationRange.map((page, index) => (
                    <li key={index}>
                        <button
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            className={`flex items-center justify-center px-2 rounded-lg h-8 ms-0 leading-tight
                                    ${currentPage !== page
                                    ? `${typeof page === 'number' ? "bg-transparent hover:bg-gray-700 hover:text-white" : ""}`
                                    : "bg-slate-900 text-white"
                                }`}
                            disabled={typeof page !== 'number'}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li>
                    <button onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === numberOfPages} className={`flex items-center justify-center h-8 leading-tight p-1 pe-[2px] bg-transparent rounded-lg ${currentPage == numberOfPages ? 'text-gray-600' : 'hover:bg-slate-700 hover:text-white'}`}>
                        <p className='text-2xl flex'><ion-icon name="caret-forward-outline"></ion-icon></p>
                    </button>
                </li>
            </ul>}
        </nav>
    );
};

export default Pagination