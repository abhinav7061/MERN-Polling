import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../../UserContext';
import styles from '../../styles';
import { Link } from 'react-router-dom';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import { toast } from 'sonner';
import Follow from '../Follow';
import Unfollow from '../UnFollow';

// Define the API URL using Vite environment variable
const apiUrl = import.meta.env.VITE_API_URL;

const Actions = ({ author, role, pollId }) => {
    // Initialize path based on the user's role
    let path = '/poll';
    if (role === 'votes') {
        path = '/poll/my-vote';
    }
    if (role === 'polls') {
        path = '/poll/my-poll';
    }

    const { userInfo } = useContext(UserContext);
    const [isFollower, setIsFollower] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showActions, setShowActions] = useState(false);
    const actionsRef = useRef(null);

    const handleActionClick = async () => {
        await checkFollowing();
        setShowActions(!showActions);
    };

    const checkFollowing = async () => {
        try {
            const response = await fetch(`${apiUrl}/user/checkFollowing/${author}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                setIsFollower(data.following);
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkFollowing();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionsRef.current && !actionsRef.current.contains(event.target)) {
                setShowActions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={actionsRef}>
            {loading ? <SmallSpinLoader /> : <span className="cursor-pointer text-slate-500 hover:text-slate-900 p-1 mb-1 hover:bg-slate-300 flex rounded-full" onClick={handleActionClick}>
                <ion-icon name="ellipsis-vertical"></ion-icon>
            </span>}
            {showActions && <span className={`absolute flex flex-col gap-1 ${styles.heading6} p-2 border border-slate-500 rounded-lg shadow-black shadow-sm right-4 bg-white z-50`}>
                {(userInfo && userInfo._id === author) && <span className="">
                    <Link to={`/poll/edit-poll/${pollId}`} state={{ path }} className=" hover:text-blue-600 flex gap-1 items-center px-2 py-1 hover:bg-blue-100 rounded-md" title="Edit Poll" >
                        <ion-icon name="create-outline"></ion-icon> Edit
                    </Link>
                    <Link to={`/poll/delete-poll/${pollId}`} state={{ path }} className="hover:text-red-500 flex gap-1 items-center px-2 py-1 hover:bg-red-100 rounded-md" title="Delete Poll" >
                        <ion-icon name="trash-outline"></ion-icon> Delete
                    </Link>
                </span>}

                {userInfo._id !== author && <>{(!isFollower) ? <Follow userToFollow={author} callback={checkFollowing} />
                    :
                    <Unfollow userToUnfollow={author} callback={checkFollowing} />}</>
                }
                <span className=" flex gap-1 items-center px-2 py-1 hover:bg-slate-200 rounded-md cursor-pointer">
                    <ion-icon name="bookmark-outline"></ion-icon> Save
                </span>
            </span>}
        </div>
    );
};

export default Actions;
