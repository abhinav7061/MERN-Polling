import { useContext, createContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { UserContext } from "../../UserContext";
import LogoutBtn from "../../components/Button/LogoutBtn";
import useMediaQuery from "../../Hooks/useMediaQuery";

// Create a context for managing the state of the Sidebar
const SidebarContext = createContext();
const apiUrl = import.meta.env.VITE_API_URL;

// Sidebar component
export default function Sidebar({ children }) {
    // Access user information from the context
    const { userInfo } = useContext(UserContext);
    const isLargeScreen = useMediaQuery('(min-width: 640px)');

    // State variable to manage Sidebar expansion
    const [expanded, setExpanded] = useState(isLargeScreen);

    useEffect(() => {
        setExpanded(isLargeScreen);
    }, [isLargeScreen])

    return (
        <aside className={`sm:h-screen ${expanded ? 'h-screen top-0' : 'h-10 sm:overflow-visible'} duration-500 overflow-hidden transition-all flex sm:static fixed z-50`}>
            {/* Logo and toggle button */}
            <nav className={`h-full flex flex-col border-r shadow-sm ${expanded ? ' bg-slate-900' : 'sm:bg-white border-r-0'} duration-500  transition-all`}>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={logo}
                        className={`overflow-hidden transition-all ${expanded ? "w-28" : "w-0"}`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className={`sm:p-3 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center sm:-translate-x-0 sm:translate-y-0 ${!expanded ? 'translate-x-[-22px] translate-y-[-5px]' : ''}`}
                        title={`${!expanded ? "Open Sidebar" : "Close Sidebar"}`}
                        type="button"
                    >
                        {expanded ? <ion-icon name="arrow-back-circle-outline" aria-label="Collapse Sidebar"></ion-icon> : <ion-icon name="arrow-forward-circle-outline" aria-label="Expand Sidebar"></ion-icon>}
                    </button>
                </div>

                {/* Provide the Sidebar state via context */}
                <SidebarContext.Provider value={{ expanded, setExpanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                {/* User information and logout button */}
                {userInfo && (
                    <div className={`border-t p-3 flex`} title={!expanded ? userInfo.name : ''}>
                        <Link to='profile' className="w-10 h-10 rounded-md flex justify-center items-center bg-blue-400 text-white overflow-hidden">
                            <img src={`${apiUrl}/profile-image/${userInfo.avatar.url}`} alt={`${userInfo.name}`} className="w-10 h-10 object-top object-cover " />
                        </Link>
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold text-white">{userInfo.name}</h4>
                                <span className="text-xs text-gray-400">{userInfo.email}</span>
                            </div>
                            <LogoutBtn />
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    );
}

// SidebarItem component
export function SidebarItem({ icon, text, active, alert }) {
    // Access the Sidebar state from the context
    const { expanded, setExpanded } = useContext(SidebarContext);
    const isLargeScreen = useMediaQuery('(min-width: 640px)');

    return (
        <li
            className={`relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : `hover:bg-indigo-50 ${expanded ? 'text-white' : 'text-gray-500'} hover:text-gray-600`
                }
    ` }
            onClick={!isLargeScreen ? () => setExpanded((open) => !open) : undefined}>
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "hidden"}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}
            {/* showing sidebar items name on hover */}
            {!expanded && (
                <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    <p className="text-center">{text}</p>
                </div>
            )}
        </li>
    );
}
