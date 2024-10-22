import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useFormik } from 'formik';
import { verifyAccountSchema } from '../../schemas';
import { lock } from '../../assets';
import styles from '../../styles';
import OTPInput from '../../components/OTPInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import ResendOTP from '../../components/ResendOTP';
import CircleLoader from '../../components/Loader/CircleLoader';

const apiUrl = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [editEmail, setEditEmail] = useState(!location?.state?.email);
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);

    const initialValues = {
        email: location?.state?.email || '',
        otp: ''
    }

    const verifyAccount = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/user/verify-account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Account verified successfully');
                setUserInfo(data.user);
                navigate('/poll');
            } else {
                toast.error(data.message || 'Failed to verify account');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while verifying the account');
        } finally {
            setLoading(false);
        }
    };

    const { values, errors, touched, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: verifyAccountSchema,
        onSubmit: verifyAccount
    });

    useEffect(() => {
        if (editEmail) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.focus();
            }
        }
    }, [editEmail]);


    return (
        <div className={`flex md:flex-row flex-col-reverse border bg-white border-sky-400 mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
            <div className={`md:w-3/5 ${styles.flexStart} flex-col lg:p-16 sm:p-8 p-6`}>
                <div className="w-full flex flex-col items-center">
                    <div className='mb-5 md:mb-8 xl:mb-14 p-5 md:p-8 bg-yellow-100 rounded-lg border border-yellow-400 text-slate-700 text-sm leading-6 max-w-sm'>
                        <p>Enter the OTP sent to your e-mail address, and we'll verify your e-mail allowing you to use this platform.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        {editEmail && (
                            <div className='mb-2'>
                                <label htmlFor="email" className="text-sm font-bold ">Email address <sup className='text-red-600 text-xs'>*</sup></label>
                                <div className="mb-6">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Enter registered email"
                                        className={`rounded-md border-2 focus:shadow-md w-full py-1 px-3 mt-1 outline-none ${errors.email && touched.email
                                            ? 'border-red-500 focus:border-red-400'
                                            : 'border-sky-500 focus:border-sky-300'
                                            }`}
                                        aria-invalid={errors.email && touched.email ? "true" : "false"}
                                        aria-describedby="email-error"
                                        value={values.email}
                                        onChange={(e) => setFieldValue('email', e.target.value)}
                                    />
                                    {errors.email && touched.email && (
                                        <p id="email-error" className='text-red-600 text-[12px] mt-1'>{errors.email}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='flex flex-col items-center justify-center mb-6'>
                            <OTPInput onChange={(otp) => setFieldValue('otp', otp)} />
                            {errors.otp && touched.otp && (
                                <p id="email-error" className='text-red-600 text-[12px] mt-[3px]'>{errors.otp}</p>
                            )}
                        </div>
                        <div className='my-6 flex gap-5 text-sm flex-col' >
                            <button
                                type="submit"
                                className={`font-poppins flex justify-center items-center gap-2 font-bold text-primary bg-blue-gradient rounded-md outline-none  p-2 md:px-4 w-full ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <CircleLoader title="Verifying..." /> : "Verify Email"}
                            </button>
                            {errors.email ? null : <ResendOTP email={values.email} />}
                        </div>
                        <div className='text-sm font-semibold text-blue-700 flex justify-center'>
                            <span className='cursor-pointer flex gap-1' onClick={() => setEditEmail(!editEmail)}>
                                <span className=' text-base'>
                                    <ion-icon name="create-outline"></ion-icon>
                                </span>
                                Edit email
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div className={`md:w-2/5 flex ${styles.flexCenter} relative md:mx-2 md:mt-0 mt-6 mx-10`}>
                <img className="w-20 md:w-full object-contain max-h-96 max-w-sm relative z-[5]"
                    src={lock}
                    alt="" />
            </div>
        </div>
    );
};

export default VerifyEmail;
