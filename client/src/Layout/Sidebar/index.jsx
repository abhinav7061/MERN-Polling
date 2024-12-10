import { useContext, createContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets";
import { UserContext } from "../../contexts/UserContext";
import LogoutBtn from "../../components/Button/LogoutBtn";
import useMediaQuery from "../../Hooks/useMediaQuery";
import useOutsideClick from "../../Hooks/useOutsideClick";

// Create a context for managing the state of the Sidebar
const SidebarContext = createContext();

// Sidebar component
export default function Sidebar({ children }) {
    // Access user information from the context
    const { userInfo } = useContext(UserContext);
    const isLargeScreen = useMediaQuery('(min-width: 640px)');
    const sidebarContainer = useRef(null);

    // State variable to manage Sidebar expansion
    const [expanded, setExpanded] = useState(isLargeScreen);
    useOutsideClick(sidebarContainer, () => {
        if (!isLargeScreen) {
            setExpanded(false)
        }
    });

    useEffect(() => {
        setExpanded(isLargeScreen);
    }, [isLargeScreen])

    return (
        <aside ref={sidebarContainer} className={`sm:h-screen ${expanded ? 'h-screen top-0' : 'h-min py-1 sm:py-0 sm:overflow-visible top-0'} sm:sticky fixed sm:shadow-sm left-0 duration-500 overflow-hidden transition-all flex z-[10]`}>
            {/* Logo and toggle button */}
            <nav className={`h-full flex flex-col border-r items-center ${expanded ? 'bg-slate-900' : 'sm:bg-white border-r-0'} duration-500  transition-all`}>
                <div className={`w-full flex justify-between items-center ${expanded ? "p-3" : "p-1 sm:p-3"}`}>
                    <img
                        src={logo}
                        className={`overflow-hidden transition-all ${expanded ? "w-28" : "w-0"}`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className={` bg-gray-200 hover:bg-gray-300 flex items-center justify-center  ${expanded ? "p-3 rounded-lg" : "text-xl sm:text-base sm:p-3 border border-slate-900 sm:border-0 rounded-full sm:rounded-lg overflow-hidden"}`}
                        title={`${!expanded ? "Open Sidebar" : "Close Sidebar"}`}
                        type="button"
                    >
                        {expanded ? <ion-icon name="arrow-back-circle-outline" aria-label="Collapse Sidebar"></ion-icon> : <span>
                            <img src={userInfo?.avatar?.url} alt={`${userInfo?.name}`} className="w-7 h-7 object-top object-cover sm:hidden" />
                            <span className="hidden sm:flex">
                                <ion-icon name="arrow-forward-circle-outline" aria-label="Expand Sidebar"></ion-icon>
                            </span>
                        </span>}
                    </button>
                </div>

                {/* Provide the Sidebar state via context */}
                <SidebarContext.Provider value={{ expanded, setExpanded }}>
                    <ul className={`flex-1 w-full overflow-y-scroll px-3 flex flex-col items-center1 ${expanded ? "" : "hidden sm:block"}`}>{children}</ul>
                </SidebarContext.Provider>

                {/* User information and logout button */}
                {userInfo && (
                    <div className={`border-t p-3 flex ${expanded ? "" : "hidden sm:block"}`} title={!expanded ? userInfo?.name : ''}>
                        <Link to='my_profile' className="w-10 h-10 rounded-md flex justify-center items-center bg-blue-400 text-white overflow-hidden" onClick={() => {
                            if (!isLargeScreen) {
                                setExpanded(false)
                            }
                        }}>
                            <img src={userInfo.avatar.url} alt={`${userInfo.name}`} className="w-10 h-10 object-top object-cover " />
                        </Link>
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "ml-3" : "hidden"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold text-white" title={userInfo.name}>{userInfo.name}</h4>
                                <span className="text-xs text-gray-400 line-clamp-1 w-32 md:w-40" title={userInfo.email}>{userInfo.email}</span>
                            </div>
                            <LogoutBtn />
                        </div>
                    </div>
                )}
            </nav>
        </aside >
    );
}

// SidebarItem component
export function SidebarItem({ icon, text, active, alert }) {
    const { expanded, setExpanded } = useContext(SidebarContext);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0 });
    const itemRef = useRef(null);
    const isLargeScreen = useMediaQuery('(min-width: 640px)');

    useEffect(() => {
        const handleScroll = () => {
            if (itemRef.current && !expanded) {
                const { top, right } = itemRef.current.getBoundingClientRect();
                setTooltipPosition({ top: top + 1, right: right });
            }
        };

        // Add scroll event listener to the parent container
        const parentElement = itemRef.current?.parentElement?.parentElement;
        parentElement?.addEventListener('scroll', handleScroll);

        // Initial position update
        handleScroll();

        // Cleanup event listener on component unmount
        return () => {
            parentElement?.removeEventListener('scroll', handleScroll);
        };
    }, [expanded]);

    return (
        <li
            ref={itemRef}
            className={`relative flex items-center p-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
                    ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : `hover:bg-indigo-50 ${expanded ? 'text-white' : 'text-gray-500'} hover:text-gray-600`
                }
                    ${!expanded ? 'w-10 h-10' : 'ps-5'}
                `}
            onClick={() => {
                if (!isLargeScreen) {
                    setExpanded(false)
                }
            }}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? " md:w-44 ml-3" : "hidden"}`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
                />
            )}
            {/* showing sidebar items name on hover */}
            {!expanded && (
                <div
                    className={`fixed rounded-md px-2 py-1 bg-indigo-100 text-indigo-800 text-sm invisible group-hover:visible group-hover:opacity-100 transition-all transform group-hover:translate-x-6 duration-300 ease-in-out`}
                    style={{ top: tooltipPosition.top, left: tooltipPosition.right }}
                >
                    <p className="text-center whitespace-nowrap">{text}</p>
                </div>
            )}
        </li>
    );
}
