import { useEffect } from 'react';
import styles from '../../styles';
import Button from '../../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '../../assets';
import { useFormik } from 'formik'
import { loginSchema } from '../../schemas';
import { UserContext } from '../../UserContext';
import { useContext } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
        remember_me: false, //if it is set to true then remember options will auto checked
    }
    const getLogin = async ({ email, password }) => {
        try {
            const res = await fetch(`${apiUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success && res.ok) {
                toast.success("Signup successfully");
                setUserInfo(data.user)
                navigate('/poll');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            getLogin(values);
        }
    })

    useEffect(() => {
        if (userInfo) {
            toast.warning("You are already logged in");
            navigate('/poll');
        }
    })

    return (

        <div className={`flex md:flex-row flex-col-reverse border bg-white border-sky-400 mx-2 my-4 md:m-20 rounded-2xl overflow-hidden`}>
            <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 p-16`}>
                {/* div for login form  */}
                <div className="w-full flex flex-col items-center">
                    {/* Telling about ourself and Registration  */}
                    <div className='mb-5'>
                        {/* <img className="h-[50px] w-[150px] mb-5" src={logo} alt="Your Company" /> */}
                        <h2 className="font-bold text-3xl md:text-4xl mb-1">Sign in to account</h2>
                        <p className="text-[12px] md:text-sm text-slate-600">Not a member? <a href="#" className="text-sky-700">Start a 14 day free trial</a></p>
                        <p className="text-[12px] md:text-sm text-slate-600">Donot have account then click here <NavLink to='/register' className={`text-sky-600`}>Signup</NavLink> </p>
                    </div>
                    {/* form div start here */}
                    <div className="w-full md:w-[80%]">
                        {/* Registration input form  */}
                        <form method="POST" onSubmit={handleSubmit}>
                            {/* div for taking email */}
                            <div className='mb-2'>
                                <label htmlFor="email" className="text-sm font-bold ">Email address:</label>
                                <div className="lb">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        // autoComplete="off"
                                        autoComplete="email"
                                        placeholder="Enter your email address"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.email && touched.email ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.email}</p>) : null}
                            </div>
                            {/* div for taking Password */}
                            <div>
                                <label htmlFor="password" className="text-sm font-bold">Password:</label>
                                <div className="lb">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter password"
                                        autoComplete="current-password"
                                        // autoComplete="off"
                                        className="rounded-md border-2 border-sky-500 w-full py-1 px-3 mt-1"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                {errors.password && touched.password ? (<p className='text-red-600 text-[12px] mt-[3px]'>{errors.password}</p>) : null}
                            </div>
                            {/* div for remember and password forgot option */}
                            <div className="flex w-full justify-between py-2 my-2 text-slate-600">
                                <div className="">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="mr-2"
                                        value={values.remember_me}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="hover:text-sky-500 cursor-pointer"
                                    >Remember me</label>
                                </div>
                                <div>
                                    <NavLink
                                        to='/forgot-password'
                                        className="hover:text-sky-500 hover:underline"
                                    >
                                        Forgot password?
                                    </NavLink>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className='my-6' >
                                <Button styles={`w-full py-1`} title={'Login'} type="submit" />
                            </div>
                        </form>
                        {/* for other authentication method like github linkdin etc */}
                        <div className="mt-10">
                            <div className="flex relative items-center justify-center">
                                <div className="h-0 w-full border border-slate-600 absolute" aria-hidden="true">
                                </div>
                                <div className="absolute">
                                    <span className="bg-white p-3">Or continue with</span>
                                </div>
                            </div>
                            <div className="flex mt-10 w-full justify-between">
                                <a href="#"
                                    className="flex h-9 font-poppins bg-blue-gradient items-center justify-center w-2/5 text-slate-500 dark:text-red-50 font-bold rounded-xl">
                                    <svg className="w-5 mr-3"
                                        aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84">
                                        </path>
                                    </svg>
                                    <span className="">Twitter</span>
                                </a>
                                <a href="#"
                                    className="flex h-9 font-poppins bg-black-gradient items-center justify-center w-2/5 text-slate-500 dark:text-red-50 font-bold rounded-xl">
                                    <svg className="w-5 mr-3"
                                        aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                            clipRule="evenodd">
                                        </path>
                                    </svg>
                                    <span className="">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`flex-1 flex ${styles.flexCenter} relative md:mx-2 md:mt-0 mt-6 mx-10`}>
                <img className="w-[100%] h-[100%] relative z-[5]"
                    src={login}
                    alt="" />
            </div>
        </div>

    )
}

export default Login