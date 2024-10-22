import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import debounce from '../../utilities/debounce';
import CircleLoader from '../Loader/CircleLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const ResendOTP = ({ email, className }) => {
    const [loading, setLoading] = useState(false);
    const [checkingResendTime, setCheckingResendTime] = useState(true);
    const [error, setError] = useState(null);
    const [timer, setTimer] = useState(120);

    const resendOtp = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/user/resend-verification-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setTimer(data.waitFor);
                toast.success('New Otp has been sent');
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while sending OTP');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const checkResendTimeLeft = useCallback(async (emailToCheck) => {
        setCheckingResendTime(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}/user/resend-verification-otp-time-left`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailToCheck }),
            });
            const data = await response.json();
            if (data.success) {
                setTimer(data.waitFor > 0 ? data.waitFor : 0);
            } else {
                throw new Error(data.message || 'error fetching');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setCheckingResendTime(false);
        }
    }, []);

    const debouncedCheckResendTimeLeft = useCallback(
        debounce((emailToCheck) => {
            if (emailToCheck) {
                checkResendTimeLeft(emailToCheck);
            }
        }, 500),
        [checkResendTimeLeft]
    );

    useEffect(() => {
        debouncedCheckResendTimeLeft(email);
        return () => debouncedCheckResendTimeLeft.cancel();
    }, [email, debouncedCheckResendTimeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes >= 1) {
            return `${minutes} min ${remainingSeconds}s`;
        }
        return `${remainingSeconds}s`;
    };

    return (
        <>
            {(email && !error && !checkingResendTime) && (
                <button
                    type="button"
                    className={`font-poppins flex justify-center items-center gap-2 font-bold text-primary bg-blue-gradient rounded-md outline-none p-2 md:px-4 w-full ${(loading || (timer > 0)) ? 'cursor-not-allowed' : ''} ${className}`}
                    disabled={loading || (timer > 0)}
                    onClick={resendOtp}
                >
                    {loading ? <CircleLoader title="Cool Down..." /> : (timer > 0) ? <span className='text-gray-600'>Resend OTP in {formatTime(timer)}</span> : "Resend OTP"}
                </button>
            )}
        </>
    );
};

export default ResendOTP;
