import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from '../../styles';
import { Link } from 'react-router-dom';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import Follow from '../Follow';
import Unfollow from '../UnFollow';
import DeletePollBtn from './DeletePollBtn';
import DropDown from '../DropDown/DropDown';
import useCheckFollowing from '../../Hooks/useCheckFollowing';
import { toast } from 'sonner';
import SaveUnsavePoll from '../SaveUnsavePoll';

const apiUrl = import.meta.env.VITE_API_URL;

const PollActions = ({ author, pollId, deletePollCallback }) => {
    const { userInfo } = useContext(UserContext);
    const [isSaved, setIsSaved] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkSavesLoading, setCheckSavesLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [copied, setCopied] = useState(false);
    const { isFollower, loading: checkFollowingLoading, checkFollowing } = useCheckFollowing({ followerId: userInfo._id, followingId: author })
    const [showActions, setShowActions] = useState(false);

    const checkPollSaves = async () => {
        setCheckSavesLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetch(`${apiUrl}/save-poll/isSaved/${pollId}`, { credentials: 'include' });
            const data = await response.json();
            if (response.ok && data.success) {
                setIsSaved(data.isSaved);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Error checking poll save status: ${error.message}`);
            setErrorMessage(error.message)
        }
        finally {
            setCheckSavesLoading(false);
        }
    }

    const handleActionClick = async () => {
        if (!showActions) {
            await checkFollowing();
            await checkPollSaves();
        }
        setShowActions(!showActions);
    };

    const handleUnfollowing = () => {
        toast.success('Successfully unfollowed');
        checkFollowing();
    }

    const handleFollowing = () => {
        toast.success('Successfully Followed');
        checkFollowing();
    }

    const handleCopy = (text) => {
        const copyToClipboard = () => {
            navigator.clipboard.writeText(text).then(() => {
                toast.success("Link copied to clipboard");
                setCopied(true);
                setTimeout(() => setCopied(false), 500);
            }).catch(err => {
                console.error('Failed to copy Link: ', err);
            });
        };
        copyToClipboard();
    };

    useEffect(() => {
        setLoading(checkSavesLoading && checkFollowingLoading);
    }, [checkSavesLoading, checkFollowingLoading])

    return (
        <DropDown
            Btn={loading ? <SmallSpinLoader /> : <span className="cursor-pointer text-slate-500 hover:text-slate-900 p-1 mb-1 hover:bg-slate-300 flex rounded-full" onClick={handleActionClick}>
                <ion-icon name="ellipsis-vertical"></ion-icon>
            </span>}
            dropDownElm={<span className={`absolute h-auto flex flex-col gap-1 ${styles.heading6} p-2 border border-slate-500 rounded-lg shadow-black shadow-sm right-4 bg-white z-50 `}>
                {(userInfo && userInfo._id === author) && <span className="">
                    <Link to={`/poll/edit-poll/${pollId}`} className=" hover:text-blue-600 flex gap-1 items-center px-2 py-1 hover:bg-blue-100 rounded-md" title="Edit Poll" >
                        <ion-icon name="create-outline"></ion-icon> Edit
                    </Link>
                    <DeletePollBtn pollId={pollId} deletePollCallback={deletePollCallback} />
                </span>}
                {userInfo._id !== author && <>{
                    isFollower ? <Unfollow userId={userInfo._id} userToUnfollowId={author} callback={handleUnfollowing} /> : <Follow userToFollow={author} callback={handleFollowing} />
                }</>
                }
                <button className={`flex gap-1 items-center px-2 py-1 rounded-md ${copied ? 'hover:bg-green-100 hover:text-green-600' : 'hover:bg-lime-100 hover:text-lime-600'} whitespace-nowrap`} onClick={() => handleCopy(`http://localhost:5173/poll/posts/${pollId}`)}>
                    {copied ? <><ion-icon name="checkmark-circle"></ion-icon>Link Copied!</> : <><ion-icon name="link-outline"></ion-icon>Copy Link</>}
                </button>

                {errorMessage ? <button type='button' className='text-red-500 flex gap-1 items-center px-2 py-1 hover:bg-red-100 rounded-md hover:text-red-600' title={`Error checking poll saved states. Error message: ${errorMessage} click to refresh`} onClick={checkPollSaves}><ion-icon name="alert-circle-outline"></ion-icon> Error</button> : <SaveUnsavePoll pollId={pollId} isSaved={isSaved} callback={() => {
                    setIsSaved(!isSaved);
                }} />}
            </span>}
            showDropDown={showActions}
            setShowDropdown={setShowActions}
        />
    );
};

export default PollActions;
