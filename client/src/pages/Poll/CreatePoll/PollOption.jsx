import React from "react";
import { deletes } from "../../../assets";
import styles from "../../../styles";
export default function PollOption(props) {
    return (
        <>
            <li className="flex w-full">
                <span
                    onClick={() => {
                        props.onSelect(props.id);
                    }}
                    className={` ${styles.flexCenter} w-8 rounded-md hover:bg-red-300 hover:border-slate-500 hover:border-2 px-2 py-1 cursor-pointer mr-6 bg-slate-300`}
                    title="Click to delete this option"
                >
                    <img src={deletes} alt="X" />
                </span>
                <h1 className='mr-3'>{props.id + 1}.</h1>
                {props.listText}
            </li>
        </>
    );
}
