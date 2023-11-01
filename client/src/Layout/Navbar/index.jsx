import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from '../../styles'
import { navLinks } from '../../constants'
import { menu, close } from '../../assets'

function Navbar() {
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    return (
        <nav className={`${styles.paddingX} md:py-5 py-3 bg-gray-900`}>
            <div className="flex items-center justify-between">
                <NavLink to="/" className="flex items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/6432/6432236.png?track=ais" className="h-8 mr-1" alt="pollab" />
                    <span className="self-center text-sm font-semibold text-white">PollLab</span>
                </NavLink>
                <div className="items-center hidden md:flex">
                    <ul className="flex font-medium">
                        {
                            navLinks.map(
                                (links, index) => (
                                    <li key={links.id}>
                                        <NavLink to={links.linkTo} className={(({ isActive }) => {
                                            const color = isActive ? 'text-sky-600' : 'text-white';
                                            const margin = index === 0 ? 'ml-0' : 'ml-6'
                                            return color + " hover:text-sky-400 " + margin;
                                        })}>{links.name}</NavLink>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
                {/* div for login signup button  */}
                <div className='hidden md:block'>
                    <button type="button" className=" bg-green-500 text-black hover:bg-blue-400  font-semibold py-2 px-5 rounded text-base" onClick={() => { navigate('/login') }}>LogIn/SignUp</button>
                </div>
                {/* div for the mobile menu*/}
                <div className="flex md:hidden items-center">
                    {/* div for the mobile menu icon */}
                    <div className="text-3xl md:hidden cursor-pointer" onClick={() => setToggle((open) => !open)}>
                        <img src={toggle ? close : menu} alt="menu" className="" />
                    </div>
                    {/* mobile nav items div */}
                    <div className={` ${!toggle ? "hidden" : "flex"
                        } items-center flex absolute top-16 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar bg-slate-900 p-6`}>
                        <ul className="fflex justify-end items-start flex-1 flex-col">
                            {
                                navLinks.map(
                                    (links) => (
                                        <li key={links.id}>
                                            <NavLink to={links.linkTo} className={(({ isActive }) => {
                                                const color = isActive ? 'text-sky-600' : 'text-white';
                                                return color + " hover:text-sky-400";
                                            })}>{links.name}</NavLink>
                                        </li>
                                    )
                                )
                            }
                            <li className='mt-4'>
                                <button type="button" className=" bg-green-500 text-black hover:bg-blue-400  font-semibold py-2 px-5 rounded text-base" onClick={() => { navigate('/login') }}>LogIn/SignUp</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar