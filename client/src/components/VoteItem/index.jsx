import React, { useState, useEffect } from "react";
import "./index.css";
import styles from "../../styles";
import { defaultUserSvg, doubleTick, like, comment } from "../../assets";
import UserDescription from "../UserDescription";
import Accordion from "../Accordion";

function VoteItem({pollData}) {
    const [voteData, setVoteData] = useState([]);
    const [totalVotes, setTotalVotes] = useState(null);
    const [voted, setVoted] = useState(false);

    useEffect(() => {
        const data = [
            { "id": 0, "votes": 1, "percentage": 10, 'selected': false, "option": "Java" },
            { "id": 1, "votes": 6, "percentage": 70, 'selected': false, "option": "Python" },
            { "id": 2, "votes": 2, "percentage": 25, 'selected': false, "option": "Cpp" },
            { "id": 3, "votes": 3, "percentage": 43, 'selected': false, "option": "JavaScript" }
        ];
        setVoteData(data);
    }, []);

    useEffect(() => {
        let sum = 0;
        voteData.forEach(function (obj) {
            sum += obj.votes;
        });
        setTotalVotes(sum);
    }, [voteData])

    const submitVote = (e) => {
        console.log("voted");
        if (voted === false) {
            const voteSelected = e.target.dataset.id;
            const voteCurrent = voteData[voteSelected].votes;
            voteData[voteSelected].votes = voteCurrent + 1;
            voteData[voteSelected].percentage += 10;
            voteData[voteSelected].selected = true;
            console.log('vote of this item ', voteCurrent + 1)
            setTotalVotes(totalVotes + 1);
            console.log('total votes ', totalVotes + 1);
            setVoted(!voted);
        }
        console.log({ voteData })
    };

    const undo = () => {
        voteData.forEach((item) => {
            console.log(item.selected);
            item.selected = false;
        })
    }

    if (voteData.length === 0 && totalVotes === null) {
        return <div>Loading...</div>
    }

    const longText = "This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters.This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters. This is a long piece of text. It could be more than 20 characters.";

    return (
        <>
            {/* // <div className="bg-white rounded-[10px] overflow-hidden mb-4 px-6 py-3"> */}
            <UserDescription />
            <hr className="my-1" />
            <Accordion content={pollData.description} />
            <div className="poll md:p-5 sm:p-4 p-3">
                <h1 className={`mb-3 font-bold ${styles.heading5}`}>{pollData.title}</h1>
                <ul>
                    {pollData.options.map((item, index) =>
                    (
                        <li key={item._id} className={`relative text-black ${styles.heading6}`}>
                            {!voted ? <button onClick={submitVote} data-id={item.id} className="overflow-hidden md:px-5 py-1 " title={`click to vote '${item.subject}'`}>
                                <span className="md:mx-3 mx-2">{index + 1}.</span> <p className="text-start">{item.subject}</p>
                            </button>
                                :
                                <div className="flex items-center">
                                    <span className="mr-4">{item.percentage}%</span>
                                    <div style={{ flex: 1 }}>
                                        <div className="flex items-center">
                                            <span className="mr-5">{item.option}</span>
                                            {item.selected && <img src={doubleTick} alt="selected" className="h-5 w-5" />}
                                        </div>
                                        <div className="progress-bar-container">
                                            <div className={`progress-bar h-full ${item.selected ? `bg-green-600` : `bg-slate-400`} absolute`} style={{ "width": `${item.percentage}%` }}>
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
                            <p className="">Total Votes: {totalVotes}</p>
                            <div className="md:mx-3 mx-1">&#x2022;</div>
                            <p className="">days left</p>
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
                <div className="flex items-center"><div className="p-1 bg-blue-300 rounded-full mr-2"><img src={like} alt="" className="w-3 h-3" /></div>{pollData.likes.length}</div>
                <div className="hover:underline cursor-pointer">{pollData.comments.length} Comment</div>
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