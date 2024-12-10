import React, { useState } from 'react'
import { sparkle } from '../../assets';

const DemoLogin = ({ getLogin }) => {
    const [showDemo, setShowDemo] = useState(true)
    return (
        <>
            <div onClick={() => { setShowDemo(!showDemo) }} className="absolute top-[10px] left-[10px] text-5xl rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer z-30 animate-ping" title={`${!showDemo ? 'Show' : 'Hide'} Demo Feature`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                    <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" strokeWidth="2" />
                    <circle cx="50" cy="50" r="20" fill="#ffffff" />
                </svg>
            </div>
            <div className={`${showDemo ? "" : "hidden"} justify-center items-center absolute bg-black-gradient top-16 md:top-0 left-[5%] px-6 py-3 pb-5 -rotate-[30deg] z-20`}>
                <div className="flex flex-col gap-2 relative">
                    <div onClick={() => { setShowDemo(!showDemo) }} className="absolute top-[-10px] right-[-22px] text-5xl rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer" title={`${!showDemo ? 'Show' : 'Hide'} Demo Feature`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="20" height="20">
                            <circle cx="50" cy="50" r="45" fill="#888888" stroke="#000000" strokeWidth="2" />
                            <circle cx="50" cy="50" r="20" fill="#ffffff" />
                        </svg>
                    </div>
                    <div className=" gap-y-2 flex flex-col">
                        <span className="text-2xl font-extrabold flex items-center"><p className='pt-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent'>Take a Demo</p><img src={sparkle} alt="" />
                        </span>
                        <div>
                            <button onClick={
                                () => getLogin('test@test.test', 'test@test')
                            } className="bg-yellow-100 font-mono font-semibold mt-4 mb-1 bg-blue-gradient text-black text-sm px-4 py-2 rounded-md flex">
                                <div className='mr-2'><ion-icon name="arrow-redo"></ion-icon></div>
                                Click here for Admin Demo</button>
                        </div>
                        <div>
                            <button onClick={
                                () => getLogin('pollab@pollab.pollab', 'pollab@pollab')
                            } className="bg-yellow-100 font-mono font-semibold bg-blue-gradient text-black text-sm px-4 py-2 rounded-md flex">
                                <div className='mr-2'><ion-icon name="arrow-redo"></ion-icon></div>
                                Click here for User Demo</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DemoLogin