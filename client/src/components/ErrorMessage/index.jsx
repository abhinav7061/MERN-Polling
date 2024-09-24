import React from 'react'

const ErrorMessage = ({ heading, message, action }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-red-500/10 border border-red-800 p-5 rounded-xl">
            <svg className="mx-auto mb-4 w-12 h-12 text-red-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div className='flex gap-5 items-center'>
                <span>
                    <h2 className="text-2xl text-red-600 text-center">{heading}</h2>
                    <p className='text-justify'>{message}</p>
                </span>
                {action && <button
                    className="px-4 py-2 bg-sky-400 hover:bg-sky-600 text-white rounded-md"
                    type='button'
                    onClick={action}
                >
                    Retry
                </button>}
            </div>
        </div>
    )
}

export default ErrorMessage