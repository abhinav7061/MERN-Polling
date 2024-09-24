import React from 'react'

const ErrorMessage2 = ({ message, action }) => {
    return (
        <div className="flex items-center justify-start gap-3 w-full bg-red-500/10 border border-red-300 px-5 py-2 rounded-lg">
            <svg className="mx-auto h-6 text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div className='flex flex-wrap gap-1 flex-1 items-start'>
                <p className='text-justify text-base me-3'>{message}</p>
                {action && <button
                    className="px-3 text-blue-400 border border-blue-300 hover:bg-sky-600/40 hover:text-white rounded-md"
                    type='button'
                    onClick={action}
                >
                    Retry
                </button>}
            </div>
        </div>
    )
}

export default ErrorMessage2