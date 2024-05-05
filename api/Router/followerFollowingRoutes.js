const express = require("express");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const { followUser, unfollowUser, isFollower, getFollowers, getFollowings, RemoveFollower } = require("../Controller/followerFollowingController");

const router = express.Router();

router.route('/follow/:id').put(isAuthenticatedUser, followUser);
router.route('/unFollow/:id').delete(isAuthenticatedUser, unfollowUser);
router.route('/checkFollowing/:id').get(isAuthenticatedUser, isFollower);
router.route('/followers').get(isAuthenticatedUser, getFollowers);
router.route('/followings').get(isAuthenticatedUser, getFollowings);
router.route('/removeFollower/:id').delete(isAuthenticatedUser, RemoveFollower);

module.exports = router;