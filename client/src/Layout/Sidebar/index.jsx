import { useContext, createContext, useState } from "react"
import { logo } from "../../assets"

const SidebarContext = createContext()

export default function Sidebar({ children }) {
    const availableScreen = window.screen.availWidth
    const [expanded, setExpanded] = useState(availableScreen > 640 ? true : false);
    return (
        <aside className={`sm:h-screen ${expanded ? 'h-screen bg-slate-900 top-0' : 'h-10 w-16 sm:bg-white bg-transparent'} duration-500  transition-all overflow-hidden flex sm:static fixed z-50`}>
            {/* <button className="sm:hidden">{expanded ? <ion-icon name="arrow-forward-circle-outline"></ion-icon> : <ion-icon name="arrow-back-circle-outline"></ion-icon>}</button> */}
            <nav className="h-full flex flex-col border-r shadow-sm">
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
                <div className="border-t flex p-3">
                    <img
                        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className="w-10 h-10 rounded-md"
                    />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-40 ml-3" : "w-0"}`}>
                        <div className="leading-4">
                            <h4 className="font-semibold text-white">John Doe</h4>
                            <span className="text-xs text-gray-400">johndoe@gmail.com</span>
                        </div>
                        <ion-icon name="ellipsis-vertical-sharp"></ion-icon>
                    </div>
                </div>
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