import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import useCheckFollowing from '../../Hooks/useCheckFollowing';
import Unfollow from '../UnFollow';
import Follow from '../Follow';
import DropDown from '../DropDown/DropDown';
import { SmallSpinLoader } from '../Loader/SpinLoader';
import styles from '../../styles';
import { UserContext } from '../../contexts/UserContext';
import { useFollowers } from '../../contexts/FollowersContext';
import { useFollowings } from '../../contexts/FollowingsContext';

const FollowerFollowingAction = ({ userId, userName, profileUserId }) => {
    const { userInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [actions, setActions] = useState(null);

    const { isFollower: isLoggedInUserFollowsUser, loading: loading1, checkFollowing: checkIsLoggedInUserFollowsUser } = useCheckFollowing({ followerId: userInfo._id, followingId: userId });
    const { isFollower: isUserFollowsLoggedInUser, loading: loading2, checkFollowing: checkIsUserFollowsLoggedInUser } = useCheckFollowing({ followerId: userId, followingId: userInfo._id });

    const { followers, setFollowers } = useFollowers();
    const { followings, setFollowings } = useFollowings();

    const callback = async (type) => {
        setLoading(true);
        await checkIsLoggedInUserFollowsUser();
        await checkIsUserFollowsLoggedInUser();
        // adding the following and removing the followers from the logged user's list on the frontend
        if (String(profileUserId) == String(userInfo._id)) {
            switch (type) {
                case 'addFollowing':
                    setFollowings([{ _id: userId, name: userName, createdAt: new Date() }, ...followings.filter(following => following._id !== userId)]);
                    toast.success(`Successfully ddded ${userName} to your followings`);
                    break;
                case 'removeFollowing':
                    setFollowings(followings.filter(following => following._id !== userId));
                    toast.success(`Successfully removed ${userName} from followings`);
                    break;
                case 'removeFollower':
                    setFollowers(followers.filter(follower => follower._id !== userId));
                    toast.success(`Successfully removed ${userName} from your followers`);
                    break;
                default:
                    break;
            }
        }
    }

    const getActions = () => {
        //if the user is logged-in user
        if (String(userInfo._id) == String(userId)) {
            return <Link to={'/poll/my_profile'} className='whitespace-nowrap px-2 p-1 flex items-center gap-1 rounded-md hover:bg-gray-200' title='Visit to your Profile'><ion-icon name="open-outline"></ion-icon>My Profile</Link>
        }// if logged user follows the user and vice versa then logged user can remove the user and can unfollow him
        else if (isLoggedInUserFollowsUser && isUserFollowsLoggedInUser) {
            return <>
                {/* for unfollowing the user  */}
                <Unfollow userId={userInfo._id} userToUnfollowId={userId} title={`Unfollow ${userName}`} callback={() => callback('removeFollowing')} />
                {/* for removing the user from follower list */}
                <Unfollow userId={userId} userToUnfollowId={userInfo._id} heading='Remove' title={`Remove ${userName} From Your Follower List`} callback={() => callback('removeFollower')} />
            </>
        }// if user follows the logged user but logged user doesn't then logged user can remove from followerList the user and can follow back him
        else if (!isLoggedInUserFollowsUser && isUserFollowsLoggedInUser) {
            return <>
                {/* for removing the user */}
                <Unfollow userId={userId} userToUnfollowId={userInfo._id} heading='Remove' title={`Remove ${userName} From Your Follower List`} callback={() => callback('removeFollower')} />
                {/* for follow back the user  */}
                <Follow userToFollow={userId} heading='Follow_back' title={`Follow Back ${userName}`} callback={() => callback('addFollowing')} />
            </>
        }// if logged user follows the user but user doesn't then logged user can unfollow him
        else if (isLoggedInUserFollowsUser && !isUserFollowsLoggedInUser) {
            return <>
                {/* for unfollowing the user  */}
                <Unfollow userId={userInfo._id} userToUnfollowId={userId} title={`Unfollow ${userName}`} callback={() => callback('removeFollowing')} />
            </>
        }
        else {
            {/* for follow back the user  */ }
            return <Follow userToFollow={userId} title={`Follow ${userName}`} callback={() => callback('addFollowing')} />
        }
    }

    const handleActionClick = async () => {
        if (!showActions) {
            setLoading(true);
            await checkIsLoggedInUserFollowsUser();
            await checkIsUserFollowsLoggedInUser();
        }
        setShowActions(!showActions);
    }

    useEffect(() => {
        setLoading(loading1 || loading2);
        setActions(getActions);
    }, [isLoggedInUserFollowsUser, isUserFollowsLoggedInUser, loading1, loading2])

    return (
        <DropDown
            Btn={loading ? <SmallSpinLoader /> : <span className="cursor-pointer text-slate-500 hover:text-slate-900 p-1 mb-1 hover:bg-slate-300 flex rounded-full" onClick={handleActionClick}>
                <ion-icon name="ellipsis-vertical"></ion-icon>
            </span>}
            dropDownElm={<span className={`absolute h-auto flex flex-col gap-1 ${styles.heading6} p-2 border border-slate-500 rounded-lg shadow-black shadow-sm right-4 bg-white z-50 `}>{actions}</span>}
            showDropDown={showActions}
            setShowDropdown={setShowActions}
        />
    );
}

export default FollowerFollowingAction