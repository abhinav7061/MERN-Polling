const express = require("express");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const { followUser, unfollowUser, isFollower, getFollowers, getFollowings, RemoveFollower } = require("../Controller/followerFollowingController");

const router = express.Router();

router.route('/follow/:id').put(isAuthenticatedUser, followUser);
router.route('/unFollow').delete(isAuthenticatedUser, unfollowUser);
router.route('/checkFollowing').get(isFollower);
router.route('/followers/:id').get(isAuthenticatedUser, getFollowers);
router.route('/followings/:id').get(isAuthenticatedUser, getFollowings);

module.exports = router;