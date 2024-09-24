import React, { useContext, useState } from 'react';
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

const PollActions = ({ author, pollId, deletePollCallback }) => {
    const { userInfo } = useContext(UserContext);
    const { isFollower, loading, checkFollowing } = useCheckFollowing({ followerId: userInfo._id, followingId: author })
    const [showActions, setShowActions] = useState(false);

    const handleActionClick = async () => {
        if (!showActions) {
            await checkFollowing();
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
                <span className=" flex gap-1 items-center px-2 py-1 hover:bg-slate-200 rounded-md cursor-pointer">
                    <ion-icon name="bookmark-outline"></ion-icon> Save
                </span>
            </span>}
            showDropDown={showActions}
            setShowDropdown={setShowActions}
        />
    );
};

export default PollActions;
