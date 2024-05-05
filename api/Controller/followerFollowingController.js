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
  const user = req.user;
  const userToUnfollowId = req.params.id;

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(user._id) === String(userToUnfollowId)) {
      throw new Error('You were not allowed follow yourself');
    }

    // Finding the user that needs to be unfollowed
    const userToUnfollow = await User.findById(userToUnfollowId);

    // If the user to unfollow does not exist, return an error
    if (!userToUnfollow) {
      return res.status(404).send({ message: 'User not found', success: false });
    }

    // Check if the user is already following the userToUnfollow
    const isFollowing = await FollowerFollowing.exists({ followerId: user._id, followingId: userToUnfollowId });
    if (!isFollowing) {
      return res.status(400).send({ message: `You are not following ${userToUnfollow.name}`, success: false });
    }

    // Remove the user from the following list of the current user
    await FollowerFollowing.deleteOne({ followerId: user._id, followingId: userToUnfollowId });

    // Return a success message
    res.status(200).send({ message: `You have unfollowed ${userToUnfollow.name}`, success: true });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.RemoveFollower = async (req, res) => {
  const userToRemoveId = req.params.id;
  const user = req.user;

  console.log({ user, userToRemoveId })

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(user._id) === String(userToRemoveId)) {
      throw new Error('You were not allowed follow yourself');
    }

    // Finding the user that needs to be unfollowed
    const userToRemove = await User.findById(userToRemoveId);

    // If the user to unfollow does not exist, return an error
    if (!userToRemove) {
      return res.status(404).send({ message: 'User not found', success: false });
    }

    // Check if the user is already following the userToRemove
    const isFollowing = await FollowerFollowing.exists({ followerId: userToRemove, followingId: user._id });
    if (!isFollowing) {
      return res.status(400).send({ message: `${userToRemove.name} is not following you`, success: false });
    }

    // Remove the user from the following list of the current user
    await FollowerFollowing.deleteOne({ followerId: userToRemove, followingId: user._id });

    // Return a success message
    res.status(200).send({ message: `${userToRemove.name} has been removed`, success: true });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.isFollower = async (req, res) => {
  const followerId = req.user._id;
  const followingId = req.params.id;

  try {
    // Checking if the request is made by the same user to avoid self-following
    if (String(followerId) === String(followingId)) {
      return res.status(200).send({ following: false, success: false });
    }

    // Check if the user is already following the userToFollow
    const isFollowing = await FollowerFollowing.exists({ followerId, followingId });
    if (isFollowing) {
      return res.status(200).send({ following: true, success: true });
    }
    return res.status(200).send({ following: false, success: false });
  } catch (err) {
    sendErrorResponse(res, 400, err.message);
  }
};

exports.getFollowers = async (req, res) => {
  const userId = req.user._id;
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
      followers,
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
};


exports.getFollowings = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, pageSize = 5 } = req.query;

  try {
    let query = { followerId: userId };

    // Find the total count of followings
    const totalFollowings = await FollowerFollowing.countDocuments(query);
    console.log({ totalFollowings });

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
      followings,
      success: true
    });
  } catch (error) {
    sendErrorResponse(res, 500, 'Internal server error');
  }
}