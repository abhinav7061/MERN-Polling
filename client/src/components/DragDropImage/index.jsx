import React, { useState, useEffect } from 'react'
import './index.css'

// drag drop file component
export default function DragDropImage({ onImageSelect, clicked, setClicked }) {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFiles = (file) => {
        onImageSelect(file[0]); // Call the provided function with the selected file
    }

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
            // onImageSelect(e.target.files[0]); // Call the provided function with the selected file
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if (clicked) {
            inputRef.current.click();
        }
        setClicked(false);
    }, []);

    return (
        <div id="form-file-upload" className=' h-56' onDragEnter={handleDrag}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept='image/*' />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div>
                    <p>Drag and drop your profile picture or</p>
                    <button className="upload-button" onClick={onButtonClick} type='button'>Upload a file</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </div>
    );
};