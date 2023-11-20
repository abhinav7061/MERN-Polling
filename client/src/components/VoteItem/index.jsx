import React, { useState, useEffect } from "react";
import "./index.css";
import styles from "../../styles";
import { defaultUserSvg, doubleTick, like, comment } from "../../assets";
import { toast } from "sonner";
import UserDescription from "../UserDescription";
import Accordion from "../Accordion";
import { getLeftTime } from "../../utilities/getLeftTime";

const apiUrl = import.meta.env.VITE_API_URL;

function VoteItem({ pollData }) {
    const [voteData, setVoteData] = useState(pollData);
    const [voted, setVoted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(getLeftTime(voteData.endDate))
    const [loading, setLoading] = useState(false)

    setInterval(() => {
        setTimeLeft(getLeftTime(voteData.endDate));
    }, 1000);

    const getPoll = async (pollId) => {
        try {
            const res = await fetch(`${apiUrl}/poll/getPoll/${pollId}`);
            const data = await res.json();
            if (data.success) {
                setVoteData(data.poll);
            }
        } catch (error) { console.log(error); }
    }

    const getVote = async (pollId, selectedOptionId) => {
        try {
            const res = await fetch(`${apiUrl}/vote/${pollId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ selectedOptionId }),
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                setVoted(true);
                getPoll(pollId)
                toast("You have successfully voted!", { type: "success" });
            } else {
                toast(data.message, { type: 'warning' })
            }
        }
        catch (error) { console.log(error); }
        finally {
            setLoading(false);
        }
    }

    const submitVote = (e, selectedOptionId) => {
        setLoading(true)
        if (voted === false) {
            // const voteSelected = e.target.dataset.id;
            // console.log({ 'selected option: ': voteSelected, 'options': id });
            getVote(pollData._id, selectedOptionId)
            // setVoted(!voted);
        }
    };

    const undo = () => {
        // voteData.forEach((item) => {
        //     console.log(item.selected);
        //     item.selected = false;
        // })
    }

    const longText = "This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters.This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters.";

    return (
        <>
            {/* // <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-6 py-3"> */}
            <UserDescription />
            <hr className="my-1" />
            <Accordion content={voteData.description} />
            <div className="poll md:p-5 sm:p-4 p-3">
                <h1 className={`mb-3 font-bold ${styles.heading5}`}>{voteData.title}</h1>
                <ul>
                    {voteData.options.map((item, index) =>
                    (
                        <li key={item._id} className={`relative text-black ${styles.heading6}`}>
                            {!voted ? <button onClick={(e) => submitVote(e, item._id)} data-id={item._id} className="overflow-hidden md:px-5 py-1 " title={`click to vote '${item.subject}'`}>
                                <span className="md:mx-3 mx-2">{index + 1}.</span> <p className="text-start">{item.subject}</p>
                            </button>
                                :
                                <div className="flex items-center">
                                    <span className="mr-4 sm:w-10 w-8">{item.progress}%</span>
                                    <div style={{ flex: 1 }}>
                                        <div className="flex items-center">
                                            <span className="mr-5">{item.subject}</span>
                                            {/* {item.selected && <img src={doubleTick} alt="selected" className="h-5 w-5" />} */}
                                        </div>
                                        <div className="progress-bar-container">
                                            <div className={`progress-bar h-full ${item.selected ? `bg-green-600` : `bg-slate-400`} absolute`} style={{ "width": `${item.progress}%` }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </li>
                    )
                    )}
                </ul>
                <div className="flex items-center mt-4">
                    <div className="flex">
                        <div className="md:w-7 w-4 rounded-full bg-white md:p-[3px] p-[1px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                        <div className="md:w-7 w-4 rounded-full md:translate-x-[-10px] translate-x-[-5px] bg-white md:p-[3px] p-[1px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                        <div className="md:w-7 w-4 rounded-full md:translate-x-[-20px] translate-x-[-10px] bg-white md:p-[3px] p-[1px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                    </div>
                    <div className={`flex font-semibold flex-1 items-center justify-between ${styles.smHeading}`}>
                        <div className="flex text-slate-400">
                            <p className="">Total Votes: {voteData.options.reduce((sum, item) => sum + item.votes, 0)}</p>
                            <div className="md:mx-3 mx-1">&#x2022;</div>
                            {(timeLeft === -1) ? <p>Closed</p> : <p className="">{timeLeft} left</p>}
                        </div>
                    </div>
                    {voted && <div className={`flex font-semibold items-center mt-2 ${styles.smHeading}`}>
                        <button onClick={undo} className="px-2 md:px-3 py-1 rounded-md  text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Undo</button>
                        <button onClick={() => setVoted(pre => !pre)} className="md:ml-6 sm:ml-4 ml-2 px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Vote again</button>
                    </div>}
                </div>
                {/* {voted && <div className={`flex font-semibold items-center mt-2 ${styles.smHeading}`}>
                    <button onClick={undo} className="px-2 md:px-3 py-1 rounded-md  text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Undo</button>
                    <button onClick={() => setVoted(pre => !pre)} className="ml-6 px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Vote again</button>
                </div>} */}
            </div>
            <div className={`flex justify-between mt-3 ${styles.heading6}`}>
                <div className="flex items-center"><div className="p-1 bg-blue-300 rounded-full mr-2"><img src={like} alt="" className="w-3 h-3" /></div>{voteData.likes.length}</div>
                <div className="hover:underline cursor-pointer">{voteData.comments.length} Comment</div>
            </div>
            <div className="h-0 border-t border-gray-400 my-1" />
            <div className="flex justify-between text-slate-600 font-semibold">
                <div className={`${styles.heading5} flex justify-center items-center w-1/2 p-2 rounded-md hover:bg-slate-200 cursor-pointer`}><img src={like} alt="" className="w-3 md:w-5 mr-1 md:mr-3" /><h5>Like</h5></div>
                <div className={`${styles.heading5} flex justify-center items-center w-1/2 p-2 rounded-md hover:bg-slate-200 cursor-pointer`}><img src={comment} alt="" className="w-3 md:w-5 mr-1 md:mr-3" />Comment</div>
            </div>
            {/* // </div> */}
        </>
    );
}
export default VoteItem;