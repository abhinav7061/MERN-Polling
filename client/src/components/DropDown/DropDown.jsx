import React, { useEffect, useRef } from 'react'

const DropDown = ({ Btn, dropDownElm, showDropDown, setShowDropdown, className }) => {
    const actionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={actionsRef} className={`relative ${className}`}>
            {Btn}
            {showDropDown && dropDownElm}
        </div>
    )
}

export default DropDown