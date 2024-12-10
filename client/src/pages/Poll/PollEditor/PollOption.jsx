import React from "react";
import { deletes } from "../../../assets";
import styles from "../../../styles";

export default function PollOption(props) {
    return (
        <li className="flex items-center w-full py-2 px-3 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-all duration-300 ease-in-out">
            <span
                onClick={() => {
                    props.onSelect(props.id);
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-red-400 text-white hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer mr-4"
                title="Click to delete this option"
            >
                <img src={deletes} alt="Delete" className="w-4 h-4" />
            </span>
            <h1 className="text-gray-700 font-semibold mr-3">{props.id + 1}.</h1>
            <span className="text-gray-600">{props.listText}</span>
        </li>
    );
}
