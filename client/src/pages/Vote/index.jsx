import React, { useState, useEffect } from "react";
import "./index.css";
import styles from "../../styles";
import { defaultUserSvg, doubleTick } from "../../assets";

function Vote() {
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
        console.log(voteData);
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
    const test = 40

    const undo = () => {
        voteData.forEach((item) => {
            console.log(item.selected);
            item.selected = false;
        })
    }

    if (voteData.length === 0 && totalVotes === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="poll">
            <h1 className={`mb-3 font-bold ${styles.heading5}`}>What is your favourite Programming Language?</h1>
            <ul>
                {voteData.map((item, index) =>
                (
                    <li key={item.id} className={`relative text-black ${styles.heading6}`}>
                        {!voted ? <button onClick={submitVote} data-id={item.id} className="overflow-hidden" title={`click to vote '${item.option}'`}>
                            <span className="mx-3">{index + 1}.</span> {item.option}
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
                    <div className="h-6 w-6 rounded-full bg-white p-[3px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                    <div className="h-6 w-6 rounded-full translate-x-[-10px] bg-white p-[3px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                    <div className="h-6 w-6 rounded-full translate-x-[-20px] bg-white p-[3px]"><img src={defaultUserSvg} alt="" className=" rounded-full" /></div>
                </div>
                <div className={`flex font-semibold items-center flex-1 justify-between ${styles.smHeading}`}>
                    <div className="flex text-slate-400">
                        <p className="">Total Votes: {totalVotes}</p>
                        <div className="mx-3">&#x2022;</div>
                        <p className="">days left</p>
                        {voted && <button onClick={undo} className="ml-6 px-3 rounded-md py-1 text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Undo</button>}
                    </div>
                    {voted && <button onClick={() => setVoted(pre => !pre)} className="ml-6 px-3 rounded-md py-1 text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Vote again</button>}
                </div>
            </div>
        </div>
    );
}
export default Vote;