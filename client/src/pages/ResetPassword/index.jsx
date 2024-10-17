import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { resetPasswordSchema } from '../../schemas';
import styles from '../../styles';
import { lock } from '../../assets';

const apiUrl = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await fetch(`${apiUrl}/user/verify-reset-token/${token}`);
                const data = await response.json();
                if (data.success) {
                    setTokenValid(true);
                }
            } catch (error) {
                console.error('Error verifying token:', error);
                toast.error('An error occurred while verifying the reset link');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const initialValues = {
        newPassword: '',
        confirmPassword: ''
    }

    const resetPassword = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/user/password/reset/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword
                }),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                resetForm();
                navigate('/login');
            } else {
                toast.error(data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred while resetting the password');
        } finally {
            setLoading(false);
        }
    };

    const { errors, touched, getFieldProps, handleSubmit, resetForm } = useFormik({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: (values) => {
            resetPassword(values);
        }
    })

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!tokenValid) {
        return (
            <div className="flex flex-col items-center justify-center flex-grow p-4 bg-gray-100">
                <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-red-600">Bad Token</h2>
                    <hr className='my-4' />
                    <p className="text-gray-700 mb-6">
                        The password reset link was invalid, possibly because it has already been used.
                        Please request a new password reset.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Link
                            to="/forgot-password"
                            className="bg-blue-gradient font-bold py-1.5 text-sm px-4 rounded-lg"
                        >
                            Request New Reset Link
                        </Link>
                        <Link
                            to="/login"
                            className="bg-blue-gradient font-bold py-1.5 text-sm px-4 rounded-lg"
                        >
                            Login
                        </Link>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <main className="reset-password-container">
            <section className={`flex md:flex-row flex-col-reverse border bg-white border-sky-400 mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
                <div className={`md:w-3/5 ${styles.flexStart} flex-col lg:p-16 sm:p-8 p-6`}>
                    <div className="w-full flex flex-col items-center">
                        <div className='mb-5 md:mb-8 xl:mb-14 p-5 md:p-8 bg-yellow-100 rounded-lg border border-yellow-400 text-slate-700 text-sm leading-6 max-w-sm'>
                            <p>Enter your new password below. Make sure it's strong and you can remember it.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full md:w-[80%]">
                            <div className='mb-2'>
                                <label htmlFor="newPassword" className="text-sm font-bold">New Password:</label>
                                <div className="lb">
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        placeholder="Enter new password"
                                        className={`rounded-md border-2 w-full py-1 px-3 mt-1 outline-none ${errors.newPassword && touched.newPassword
                                            ? 'border-red-500'
                                            : 'border-sky-500'
                                            }`}
                                        aria-invalid={errors.email && touched.email ? "true" : "false"}
                                        aria-label="New password"
                                        aria-describedby="email-error"
                                        {...getFieldProps('newPassword')}
                                    />
                                </div>
                                {errors.newPassword && touched.newPassword && (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.newPassword}</p>)}
                            </div>
                            <div className='mb-2'>
                                <label htmlFor="confirmPassword" className="text-sm font-bold">Confirm Password:</label>
                                <div className="lb">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                        className={`rounded-md border-2 w-full py-1 px-3 mt-1 outline-none ${errors.confirmPassword && touched.confirmPassword
                                            ? 'border-red-500'
                                            : 'border-sky-500'
                                            }`}
                                        aria-label="Confirm new password"
                                        aria-invalid={errors.email && touched.email ? "true" : "false"}
                                        aria-describedby="email-error"
                                        {...getFieldProps('confirmPassword')}
                                    />
                                </div>
                                {errors.confirmPassword && touched.confirmPassword && (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.confirmPassword}</p>)}
                            </div>
                            <div className='my-6' >
                                <button
                                    type="submit"
                                    className={`font-poppins flex justify-center items-center gap-2 font-bold text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none w-full py-1 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <svg aria-hidden="true" className="w-4 h-4 text-gray-200 animate-spin dark:text-white fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span>Resetting...</span>
                                        </>
                                    ) : "Reset Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`md:w-2/5 flex ${styles.flexCenter} relative md:mx-2 md:mt-0 mt-6 mx-10`}>
                    <img className="w-20 md:w-full object-contain max-h-96 max-w-sm relative z-[5]"
                        src={lock}
                        alt="" />
                </div>
            </section>
        </main>
    );
};

export default ResetPassword;
