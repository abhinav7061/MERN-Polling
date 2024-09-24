const FollowerFollowing = require('../Models/FollowerFollowing')
const User = require('../Models/UserSchema')
const { sendErrorResponse } = require('../middlewares/erroHandle')

exports.followUser = async (req, res) => {
  const user = req.user;
  const userToFollowId = req.params.id;

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(user._id) === String(userToFollowId)) {
      throw new Error('You cannot follow yourself');
    }

    // Finding the user that needs to be followed
    const userToFollow = await User.findById(userToFollowId);

    // If the user does not exist, return an error
    if (!userToFollow) {
      return sendErrorResponse(res, 404, `User not found`);
    }

    // Check if the user is already following the userToFollow
    const isFollowing = await FollowerFollowing.exists({ followerId: user._id, followingId: userToFollowId });
    if (isFollowing) {
      return sendErrorResponse(res, 400, `You are already following ${userToFollow.name}`);
    }

    // Create the follower following 
    await FollowerFollowing.create({ followerId: user._id, followingId: userToFollowId })

    // Return a success message
    return res.status(200).send({ message: 'User successfully followed', success: true });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.unfollowUser = async (req, res) => {
  const userToUnfollowId = req.query.userToUnfollowId;
  const userId = req.query.userId;

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(userId) === String(userToUnfollowId)) {
      throw new Error('You were not allowed follow yourself');
    }

    // Finding the user that needs to be unfollowed
    const userToUnfollow = await User.findById(userToUnfollowId);
    const user = await User.findById(userId);
    // If the user to unfollow does not exist, return an error
    if (!userToUnfollow || !user) {
      throw new Error('User not found');
    }

    // Check if the user is already following the userToUnfollow
    const isFollowing = await FollowerFollowing.exists({ followerId: userId, followingId: userToUnfollowId });
    if (!isFollowing) {
      throw new Error(`You are not following ${userToUnfollow.name}`);
    }

    // Remove the user from the following list of the current user
    await FollowerFollowing.deleteOne({ followerId: user._id, followingId: userToUnfollowId });

    // Return a success message
    res.status(200).send({ message: `You have unfollowed ${userToUnfollow.name}`, success: true });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.isFollower = async (req, res) => {
  const followerId = req.query.followerId;
  const followingId = req.query.followingId;

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(followerId) === String(followingId)) {
      return res.status(200).send({ following: false, success: true, message: "Both user are same" });
    }

    // Check if the user is already following the userToFollow
    const isFollowing = await FollowerFollowing.exists({ followerId, followingId });
    if (isFollowing) {
      return res.status(200).send({ following: true, success: true });
    }
    return res.status(200).send({ following: false, success: true, message: "User is not a follower" });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.getFollowers = async (req, res) => {
  const userId = req.params.id;
  const { page = 1, pageSize = 5 } = req.query;
  try {
    let query = { followingId: userId };

    // Find the total count of followers 
    const totalFollowers = await FollowerFollowing.countDocuments(query);

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch followers with pagination and sorting
    const followers = await FollowerFollowing.find(query)
      .select('followerId createdAt')
      .populate('followerId', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    // Return followers and pagination metadata
    res.status(200).json({
      totalFollowers,
      followers: followers.map(f => ({ _id: f.followerId._id, name: f.followerId.name, createdAt: f.createdAt })),
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};


exports.getFollowings = async (req, res) => {
  const userId = req.params.id;
  const { page = 1, pageSize = 5 } = req.query;

  try {
    let query = { followerId: userId };

    // Find the total count of followings
    const totalFollowings = await FollowerFollowing.countDocuments(query);

    // Calculate skip and limit for pagination
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Fetch followers with pagination and sorting
    const followings = await FollowerFollowing.find(query)
      .select('followingId createdAt')
      .populate('followingId', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    // Return followers and pagination metadata
    res.status(200).json({
      totalFollowings,
      followings: followings.map(f => ({ _id: f.followingId._id, name: f.followingId.name, createdAt: f.createdAt })),
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
}