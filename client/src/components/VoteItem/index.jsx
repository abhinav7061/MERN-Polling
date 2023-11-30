// Import necessary dependencies and styles
import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import styles from "../../styles";
import { defaultUserSvg, doubleTick, like, likedThumb, comment, login } from "../../assets";
import { toast } from "sonner";
import UserDescription from "../UserDescription";
import Accordion from "../Accordion";
import { getLeftTime } from "../../utilities/getLeftTime";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import PulseLoader from "../Loader/PulseLoader";
import { MediumSpinLoader } from "../Loader/SpinLoader";

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

// Function for rendering individual vote items
function VoteItem({ pollData, role }) {
    // Initialize path based on the user's role
    let path = '/poll';
    if (role === 'votes') {
        path = '/poll/my-vote';
    }
    if (role === 'polls') {
        path = '/poll/my-poll';
    }

    // Access user information from the context
    const { userInfo } = useContext(UserContext);

    // State variables for managing component state
    const [feedData, setFeedData] = useState(pollData);
    const [voters, setVoters] = useState(null);
    const [voted, setVoted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(getLeftTime(feedData.endDate));
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inputComment, setInputComment] = useState('');
    const [commentInputField, setCommentInputField] = useState(false);
    const [liked, setLiked] = useState(false);
    const [votedData, setVotedData] = useState(null);

    // Effect to update timeLeft every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getLeftTime(feedData.endDate));
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [feedData.endDate]);

    // Function to check if the user has liked the poll
    const checkLiked = (feedData) => {
        if (feedData.likes.includes(userInfo._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }

    // Function to check if the user has voted on the poll
    const checkVoted = async (pollId) => {
        try {
            const res = await fetch(`${apiUrl}/vote/checkVote/${pollId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok && data.voted) {
                setVotedData(data.vote);
                setVoted(true);
                return
            }
            setVoted(false);
        } catch (error) {
            console.log('Error while checking your vote on this poll ', error.message);
        } finally {
            setIsLoading(false);
        }
    }

    // Function to get the list of voters for the poll
    const getVoters = async (pollId) => {
        try {
            const res = await fetch(`${apiUrl}/vote/voters?poll=${pollId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
            const data = await res.json();
            if (res.ok && data.success) {
                setVoters(data.voters);
                checkVoted(pollId)
                return
            }
        } catch (error) {
            console.log('Error while voting on this poll', error);
        }
    }

    // Effect to check liked status and get voters when feedData changes
    useEffect(() => {
        checkLiked(feedData);
        getVoters(feedData._id);
    }, [feedData])

    // Function to get the details of a poll by its ID
    const getPoll = async (pollId) => {
        try {
            const res = await fetch(`${apiUrl}/poll/getPoll/${pollId}`);
            const data = await res.json();
            if (data.success) {
                setFeedData(data.poll);
            }
        } catch (error) {
            console.log('Error while updating the information poll', error);
        }
    }

    // Function to handle voting on a poll
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
        } catch (error) {
            console.log('Error while voting poll', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to submit a vote
    const submitVote = (e, selectedOptionId) => {
        setIsLoading(true);
        setLoading(true);
        if (voted === false) {
            getVote(pollData._id, selectedOptionId)
        }
    };

    // Function to undo a vote
    const undoVote = async (pollId) => {
        try {
            const res = await fetch(`${apiUrl}/vote/${pollId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                checkVoted(pollId)
                getPoll(pollId);
                toast("You have deleted your vote!", { type: "success" });
            } else {
                toast(data.message, { type: 'warning' })
            }
        } catch (error) {
            console.log('Error while deleting your vote for this poll', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to handle liking or disliking a poll
    const handleLike = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/poll/like-dislike/${feedData._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                getPoll(feedData._id)
                setLiked(!liked);
                toast(data.message, { type: "info" });
            } else {
                toast(data.message, { type: 'warning' })
            }
        } catch (error) {
            console.log('Error during like on this poll', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to handle posting a comment
    const handleCommentPost = async (e) => {
        e.preventDefault();
        if (inputComment.length < 3) return toast.warning("The comment should contain 3 characters")
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/poll/comment/${feedData._id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment: inputComment }),
                credentials: 'include',
            })
            const data = await res.json();
            if (res.ok) {
                getPoll(feedData._id)
                setInputComment('');
                toast(data.message, { type: "info" });
            } else {
                toast(data.message, { type: 'warning' })
            }
        } catch (error) {
            console.log('Error while posting your comment', error);
        } finally {
            setLoading(false);
        }
    }

    // Render the VoteItem component
    return (
        <>
            {loading && <div className="absolute w-full h-full z-10 loading"><MediumSpinLoader /></div>}
            {/* User information and action buttons */}
            <div className="flex items-center">
                <div className="flex-1">
                    <UserDescription userId={feedData.author} />
                </div>
                {/* Display edit and delete buttons for the poll owner */}
                {(userInfo && userInfo._id === feedData.author) && (<>
                    <Link to={`/poll/edit-poll/${feedData._id}`} state={{ path }} className=" hover:text-blue-600" title="Edit Poll">
                        <ion-icon name="create-outline"></ion-icon>
                    </Link>
                    <Link to={`/poll/delete-poll/${feedData._id}`} state={{ path }} className="md:ml-3 lg:ml-5 ml-1 hover:text-red-500" title="Delete Poll">
                        <ion-icon name="trash-outline">
                        </ion-icon>
                    </Link>
                </>)}
            </div>
            <hr className="my-1" />
            {/* Display poll description in an accordion */}
            <Accordion content={feedData.description} />
            {/* Poll details */}
            <div className="poll md:p-5 sm:p-4 p-3">
                <h1 className={`mb-3 font-bold ${styles.heading5}`}>{feedData.title}</h1>
                <ul>
                    {/* Display poll options */}
                    {
                        feedData.options.map((item, index) => (
                            <li key={item._id} className={`relative text-black ${styles.heading6}`}>
                                {
                                    // displaying the poll option if user does not voted on the poll  and if voted then displaying poll result 
                                    !voted ? (
                                        <button onClick={(e) => submitVote(e, item._id)} data-id={item._id} className="overflow-hidden md:px-5 py-1 " title={`click to vote '${item.subject}'`}>
                                            <span className="md:mx-3 mx-2">{index + 1}.</span> <p className="text-start">{item.subject}</p>
                                        </button>
                                    ) : (
                                        <div className="flex items-center">
                                            <span className="mr-4 sm:w-10 w-8">{Math.round(item.progress)}%</span>
                                            {isLoading ? <PulseLoader /> : <div style={{ flex: 1 }}>
                                                <div className="flex items-center">
                                                    <span className="mr-5">{item.subject}</span>
                                                    {item._id === votedData.selectedOption && <img src={doubleTick} alt="selected" className="h-5 w-5" />}
                                                </div>
                                                <div className="progress-bar-container">
                                                    <div className={`rounded-xl h-full ${item._id === votedData.selectedOption ? `bg-green-600` : `bg-slate-400`} absolute`} style={{ "width": `${item.progress}%` }}>
                                                    </div>
                                                </div>
                                            </div>}
                                        </div>
                                    )
                                }
                            </li>
                        )) //poll option field ended here
                    }
                </ul>
                {/* Display voters and poll details */}
                <div className="flex items-center mt-4">
                    <div className="flex">
                        {
                            // showing last three voter's
                            !isLoading && voters.slice(0, 3).reverse().map((voter, index, arr) => (
                                <div
                                    key={index}
                                    className={`rounded-full bg-white md:p-[3px] p-[1px] image-${index} ${arr.length === 1 ? 'mr-1' : null}`}
                                >
                                    <img src={`${apiUrl}/profile-image/${voter.avatar.url}` || defaultUserSvg} alt={`Voter ${index + 1}`} className="rounded-full object-top object-cover bg-slate-300 sm:w-6 sm:h-6 w-4 h-4" />
                                </div>
                            ))
                        }
                    </div>
                    <div className={`flex font-semibold flex-1 items-center justify-between ${styles.smHeading}`}>
                        <div className="flex text-slate-400">
                            <p className="">Total Votes: {feedData.options.reduce((sum, item) => sum + item.votes, 0)}</p>
                            <div className="md:mx-3 mx-1">&#x2022;</div>
                            { //showing poll time left to be closed
                                (timeLeft === -1) ? <p>Closed</p> : <p className="">{timeLeft} left</p>
                            }
                        </div>
                    </div>
                    { //botton to delete the vote and vote again
                        voted && (<div className={`flex font-semibold items-center mt-2 ${styles.smHeading}`}>
                            <button onClick={() => undoVote(feedData._id)} className="px-2 md:px-3 py-1 rounded-md  text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Undo</button>
                            {/* <button className="md:ml-6 sm:ml-4 ml-2 px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors">Vote again</button> */}
                        </div>)
                    }
                </div>
            </div>
            {/* Like and Comment counts */}
            <div className={`flex justify-between mt-3 ${styles.heading6}`}>
                <div className="flex items-center"><div className="p-1 bg-blue-300 rounded-full mr-2"><img src={like} alt="" className="w-3 h-3" /></div>{feedData.likes.length}</div>
                <div className="hover:underline cursor-pointer" onClick={() => setCommentInputField(prev => !prev)}>{feedData.comments.length} Comment</div>
            </div>
            <div className="h-0 border-t border-gray-400 my-1" />
            {/* Like and Comment buttons */}
            <div className="flex justify-between text-slate-600 font-semibold">
                <div className={`${styles.heading5} flex justify-center items-center w-1/2 p-2 rounded-md hover:bg-slate-200 cursor-pointer`} onClick={handleLike} style={{
                    color: `${liked ? 'blue' : ''}`
                }}>
                    <img className="w-3 md:w-5 mr-1 md:mr-3 transition-all duration-1000" src={liked ? likedThumb : like} style={liked ? { WebkitTransform: 'scaleX(-1)', transform: 'scaleX(-1)' } : {}} />
                    <h5>Like</h5>
                </div>
                <div className={`${styles.heading5} flex justify-center items-center w-1/2 p-2 rounded-md hover:bg-slate-200 cursor-pointer`} onClick={() => setCommentInputField(prev => !prev)}><img src={comment} alt="" className="w-3 md:w-5 mr-1 md:mr-3" />Comment</div>
            </div>
            <div className={`my-3 ${commentInputField ? '' : 'hidden'}`}>
                {/* form for taking comments inputs */}
                <form className={`flex ${styles.heading5}`} onSubmit={handleCommentPost}>
                    <input type="text" name="comment" value={inputComment} onChange={(e) => { setInputComment(e.target.value) }} className={`w-full border-2 border-slate-400 px-3 sm:px-5 py-1 outline-none focus:border-slate-600 rounded-3xl`} placeholder="Enter your comment here" autoComplete="off" required />
                    <input type="submit" value="Post" className="md:ml-6 sm:ml-4 ml-2 px-2 md:px-3 py-1 rounded-md text-black hover:text-white bg-slate-300 hover:bg-sky-400 duration-500 transition-colors cursor-pointer" />
                </form>
                { // showing all the comment for this poll if present
                    (feedData.comments.length > 0) ? (
                        <div className="my-3 border border-slate-800 rounded-lg py-3 px-5">
                            <div className={`flex justify-between mb-4 ${styles.heading5}`}><p>Comments</p> <p className="cursor-pointer">Most Relevent</p></div>
                            {feedData.comments.map((comment, index) => (
                                <div className={`rounded-md bg-slate-100 p-3 ${feedData.comments.length - 1 === index ? '' : "mb-5"}`} key={comment._id}>
                                    <UserDescription userId={comment.user} />
                                    <h1 className={`${styles.heading5} mt-1 px-2`}>{comment.comment}</h1>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center my-3 py-3 px-5">
                            <img src={login} alt="comment" className="lg:h-44 md:h-40 sm:h-36 h-28" />
                            <h1 className={`font-semibold ${styles.heading5}`}>Be the first to comment</h1>
                        </div>)
                }
            </div>
        </>
    );
}
export default VoteItem;