import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const closeInstallPrompt = () => {
        setIsVisible(false);
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        localStorage.setItem('installPromptDismissed', expiryDate.toISOString());
    };

    const checkInstallPromptDismissed = () => {
        const dismissedUntil = localStorage.getItem('installPromptDismissed');
        if (dismissedUntil) {
            const expiryDate = new Date(dismissedUntil);
            return expiryDate > new Date();
        }
        return false;
    };

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            if (checkInstallPromptDismissed()) {
                return;
            }
            event.preventDefault();
            setDeferredPrompt(event);
            setIsVisible(true);
        };

        if ('serviceWorker' in navigator) {
            window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    useEffect(() => {
        const checkStandaloneMode = () => {
            if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
                setIsVisible(false);
            } else if (!checkInstallPromptDismissed()) {
                setIsVisible(true);
            }
        };

        checkStandaloneMode();
    }, []);

    const showInstallPrompt = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    closeInstallPrompt();
                } else {
                    console.log('User dismissed the install prompt');
                    closeInstallPrompt();
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div
            className={`fixed bottom-4 right-4 ml-4 bg-white shadow-md rounded-lg z-[999] ${isVisible ? 'block' : 'hidden'
                }`}
        >
            <div className="flex justify-between items-center px-4 py-3">
                <h3 className="text-lg font-semibold">Install PollSphere</h3>
                <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 focus:outline-none rounded-md translate-x-3 -translate-y-2"
                    onClick={closeInstallPrompt}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className="px-4 pb-3 flex flex-wrap gap-4 items-center">
                <p className="text-base mb-2">Install our app to access all the features!</p>
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 font-semibold rounded-lg px-5 py-2.5 shadow-sm disabled:opacity-50"
                    onClick={showInstallPrompt}
                >
                    Install
                </button>
            </div>
        </div>
    );
};

export default InstallPrompt;