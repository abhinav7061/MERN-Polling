import { useEffect, useState } from "react";

const CustomPopup = ({ visibility, onClose, children }) => {
    const [show, setShow] = useState(false);

    const closeHandler = (e) => {
        setShow(false);
        onClose(false);
    };

    useEffect(() => {
        setShow(visibility);
    }, [visibility]);

    return (
        <div
            className={`${show ? 'block' : 'hidden'} fixed top-0 bottom-0 left-0 right-0 bg-black/60 z-[1000] flex items-center justify-center`}
        >
            <div className="relative group">
                <div className={'text-gray-800 bg-white/60 h-6 w-6 rounded-full shadow-2xl cursor-pointer hover:bg-red-100 hover:text-red-600 hidden group-hover:flex items-center justify-center absolute -right-0 translate-x-[40%] -translate-y-[40%] text-xl'} onClick={closeHandler}>
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className={'rounded-lg p-5 bg-slate-50 max-h-[80vh] max-w-[90vw] overflow-auto'}>{children}</div>
            </div>
        </div>
    );
};

export default CustomPopup;
