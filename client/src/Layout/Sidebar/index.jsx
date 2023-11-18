import { useContext, createContext, useState } from "react"
import { logo } from "../../assets"
import { UserContext } from "../../UserContext"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const { setUserInfo, userInfo } = useContext(UserContext);
    const availableScreen = window.screen.availWidth

    // Split the text into an array of words
    let words;

    // Extract the first letter of each word
    let firstLetters;

    // createing final avatar name
    let avatar = 'A';

    // if (userInfo) {
    //     words = userInfo.name.split(" ");
    //     firstLetters = words.map(word => word[0].toUpperCase());
    //     avatar = firstLetters.join("");
    // }

    const [expanded, setExpanded] = useState(availableScreen > 640 ? true : false);
    return (
        <aside className={`sm:h-screen ${expanded ? 'h-screen top-0' : 'h-10 sm:overflow-visible'} duration-500 overflow-hidden transition-all flex sm:static fixed z-50`}>
            {/* <button className="sm:hidden">{expanded ? <ion-icon name="arrow-forward-circle-outline"></ion-icon> : <ion-icon name="arrow-back-circle-outline"></ion-icon>}</button> */}
            <nav className={`h-full flex flex-col border-r shadow-sm ${expanded ? ' bg-slate-900' : 'sm:bg-white border-r-0'} duration-500  transition-all`}>
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={logo}
                        className={`overflow-hidden transition-all ${expanded ? "w-28" : "w-0"
                            }`}
                        alt=""
                    />
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className={`sm:p-3 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center sm:-translate-x-0 sm:translate-y-0 ${!expanded ? 'translate-x-[-22px] translate-y-[-5px]' : ''}`}
                        title="Click to open Sidebar"
                    >
                        {expanded ? <ion-icon name="arrow-back-circle-outline"></ion-icon> : <ion-icon name="arrow-forward-circle-outline"></ion-icon>}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>
                {userInfo && <div className={`border-t p-3 flex`} title={!expanded ? userInfo.name : ''}>
                    <div
                        className="w-10 h-10 rounded-md flex justify-center items-center bg-blue-500 text-white"
                    >{avatar}</div>
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"} `}>
                        <div className="leading-4">
                            <h4 className="font-semibold text-white">{userInfo.name}</h4>
                            <span className="text-xs text-gray-400">{userInfo.email}</span>
                        </div>
                        <ion-icon name="ellipsis-vertical-sharp"></ion-icon>
                    </div>
                </div>}
            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert, onClicks }) {
    const { expanded } = useContext(SidebarContext)

    return (
        <li
            className={`
        relative flex items-center p-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : `hover:bg-indigo-50 ${expanded ? 'text-white' : 'text-gray-500'} hover:text-gray-600`
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "hidden"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    <p className="text-center">{text}</p>
                </div>
            )}
        </li>
    )
}