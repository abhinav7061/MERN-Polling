import { useState, useEffect } from 'react'
import CustomPopup from '.';

const WarningPrompt = ({ visibility, onClose, warningMessage = '', onAcceptance }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupCloseHandler = () => {
        setShowPopup(false);
        onClose(false);
    };

    useEffect(() => {
        setShowPopup(visibility);
    }, [visibility]);

    return (
        <CustomPopup
            onClose={popupCloseHandler}
            visibility={showPopup}
        >
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 w-12 h-12 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-600">{warningMessage}</h3>
                <div className='flex gap-3 justify-center flex-wrap'>
                    <button
                        type="button"
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 rounded-lg border border-gray-600 hover:border-blue-500  hover:bg-blue-200/50 hover:text-blue-700"
                        onClick={() => onAcceptance(true)}
                    >
                        Yes, I'm sure
                    </button>
                    <button
                        type="button"
                        className="text-red-600 border border-red-400 hover:bg-red-200 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        onClick={() => onAcceptance(false)}
                    >
                        No, cancel
                    </button>
                </div>
            </div>
        </CustomPopup>
    )
}

export default WarningPrompt