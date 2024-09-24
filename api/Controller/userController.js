const User = require("../Models/UserSchema");
const Poll = require("../Models/PollSchema");
const Vote = require("../Models/VoteSchema");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const validator = require("validator");
const cloudinary = require("cloudinary");
const { sendErrorResponse } = require("../middlewares/erroHandle");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const { uploadImageToOwnServer, unlinkPreviousImage } = require('../helper/uploads')
const defaultUserSvg = "defaultUserSvg.svg"
const { roundToDecimalPlaces } = require('../helper/functions')

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, myStatus } = req.body;

    const avatar = req.file;

    // Validate required fields
    if (!name) return sendErrorResponse(res, 400, "Name is required");
    if (!email) return sendErrorResponse(res, 400, "Email is required");
    if (!password) return sendErrorResponse(res, 400, "Password is required");
    if (!validator.isEmail(email))
      return sendErrorResponse(res, 400, "Invalid email");
    if (password.length < 8) {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 8 characters"
      );
    }

    let user = await User.findOne({ email });
    if (user) return sendErrorResponse(res, 400, "This email is in use. Use another one or try to login with the same email");

    let ProfileImageUrl;

    // If an avatar is provided, upload it to the server
    if (avatar) {
      ProfileImageUrl = uploadImageToOwnServer(avatar);
    } else {
      // If no avatar is provided, use a default image
      ProfileImageUrl = defaultUserSvg;
    }

    // Create a new user with the provided information
    user = await User.create({
      name,
      email,
      password,
      myStatus,
      avatar: {
        public_id: ProfileImageUrl,
        url: ProfileImageUrl,
      },
    });

    // Generate a token for the new user
    const token = user.generateToken();

    // Set cookie options for the token
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Respond with success and user information, along with the token in a cookie
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    // Handle any errors that occur during the registration process
    sendErrorResponse(res, 500, error.message);
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return sendErrorResponse(res, 400, "Email is required");
    if (!password) return sendErrorResponse(res, 400, "Password is required");
    const user = await User.findOne({ email });
    if (!user) return sendErrorResponse(res, 404, "User not found");
    if (!validator.isEmail(email))
      return sendErrorResponse(res, 400, "Invalid Email");
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch)
      return sendErrorResponse(res, 401, "Invalid password");
    let { token } = req.cookies;
    if (token) return sendErrorResponse(res, 400, "you are already logged in");
    token = user.generateToken();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Loggedin Successfully",
      user,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return sendErrorResponse(res, 401, "you are already logged out");
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: "Logged Out successfully",
      });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendErrorResponse(res, 404, "User not found");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendErrorResponse(res, 404, "User not found");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return sendErrorResponse(res, 404, "User not found");
    const resetPasswordToken = await user.generateResetPasswordToken();
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/user/password/reset/${resetPasswordToken}`;

    const message = `Click the below link to reset your password \n\n ${resetPasswordUrl} \n\n`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password Recovery",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email Sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      sendErrorResponse(res, 500, error.message);
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const resetToken = await User.findOne({ resetPasswordToken });
    if (!resetToken) {
      return sendErrorResponse(res, 404, "Token not found");
    }

    if (resetToken.resetPasswordExpire < Date.now()) {
      return sendErrorResponse(res, 400, "Token has expired");
    }

    const { newPassword, confirmPassword } = req.body;

    if (!newPassword) {
      return sendErrorResponse(res, 400, "New password is required");
    }

    if (!confirmPassword) {
      return sendErrorResponse(res, 400, "Confirm password is required");
    }

    if (newPassword !== confirmPassword) {
      return sendErrorResponse(res, 400, "Passwords do not match");
    }

    const user = await User.findById(resetToken._id);

    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, oldPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isPasswordMatch = await user.matchPassword(oldPassword);
    if (!isPasswordMatch)
      return sendErrorResponse(
        res,
        401,
        "Password doesnot match with oldPassword"
      );
    if (newPassword !== confirmPassword)
      return sendErrorResponse(
        res,
        401,
        "newPassword and oldPassword doesnot match"
      );
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, email, myStatus } = req.body;

    const avatar = req.file;

    const user = await User.findById(req.user._id);

    // Update user information if provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (myStatus) user.myStatus = myStatus;

    // Update user avatar if a new avatar is provided
    if (avatar) {
      // Check if the current avatar is not the default one and unlink the previous image
      if (user.avatar.url !== defaultUserSvg) {
        unlinkPreviousImage(avatar.path.substring(0, avatar.path.lastIndexOf('/')), user.avatar.url);
        // unlinkPreviousImage(avatar.destination, user.avatar.url);
      }

      // Upload the new profile image and update the user's avatar URL
      const profileImage = uploadImageToOwnServer(avatar, userId);
      user.avatar.url = profileImage;
    }

    // Save the updated user information
    await user.save();

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });

  } catch (error) {
    // handle any errors that occur during the profile update process
    sendErrorResponse(res, 500, error.message);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "Admin" },
      { new: true }
    );
    if (!updatedUser) return sendErrorResponse(res, 404, "User not found");
    await updatedUser.save();
    res.status(200).json({
      success: true,
      message: `${updatedUser.name} is now Admin`,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "Profile Deleted successfully",
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

//  Controller for the user dashboard 
exports.getDashboard = async (req, res) => {
  try {
    const userId = req.params.id;
    // Get total active polls for the user
    const activePolls = await Poll.countDocuments({
      author: userId,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    });

    // Get total polls created by the user
    const totalPollsCreated = await Poll.countDocuments({ author: userId });

    // Get total votes given to active polls
    const activePollVotes = await Vote.countDocuments({
      User: userId,
      Poll: {
        $in: await Poll.find({
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() }
        }).distinct('_id')
      },
    });

    // Get total votes given by the user in his lifetime
    const lifetimeVotes = await Vote.countDocuments({ User: userId });

    // Generate an array of dates for the last 7 days
    const dateRange = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toISOString().split('T')[0];
    });

    // Get poll data for chart (active and closed polls in the last 7 days)
    const pollChartData = await Poll.aggregate([
      {
        $match: {
          author: new ObjectId(userId),
          endDate: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Fill in missing dates with zero counts for pollChartData
    const filledPollChartData = dateRange.map((date) => ({
      label: new Date(date).toLocaleDateString('en-GB'),
      count: pollChartData.find((entry) => entry._id === date)?.count || 0,
    }));

    // Get poll data for the previous 7 days
    const previousPollChartData = await Poll.aggregate([
      {
        $match: {
          author: new ObjectId(userId),
          endDate: {
            $gte: new Date(new Date() - 14 * 24 * 60 * 60 * 1000), // Previous 7 days
            $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // Last 14 days to Last 7 days
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalPollInThisWeak = filledPollChartData.reduce((acc, current) => acc + current.count, 0);
    const totalPollInLastWeak = previousPollChartData.reduce((acc, current) => acc + current.count, 0);

    // Calculating polls growth percentage
    let pollGrowthPercentage;
    if (totalPollInLastWeak === 0) {
      pollGrowthPercentage = 100;
    } else {
      pollGrowthPercentage = roundToDecimalPlaces(((Math.abs(totalPollInThisWeak - totalPollInLastWeak) / totalPollInLastWeak) * 100), 2); // Growth percentage with respect to previous seven days
    }

    // Compare poll counts for the last 7 days and the previous 7 days
    const pollComparison = {
      totalNumber: totalPollsCreated,
      growth: totalPollInThisWeak > totalPollInLastWeak,
      growthPercentage: pollGrowthPercentage,
      thisWeek: totalPollInThisWeak,
      lastWeek: totalPollInLastWeak,
    };

    // Get vote data for chart (active and closed votes in the last 7 days)
    const voteChartData = await Vote.aggregate([
      {
        $match: {
          User: new ObjectId(userId),
          createdAt: { $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
        },
      },
      {
        $lookup: {
          from: 'polls',
          localField: 'Poll',
          foreignField: '_id',
          as: 'poll',
        },
      },
      {
        $unwind: '$poll',
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$poll.createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);

    // Fill in missing dates with zero counts for voteChartData
    const filledVoteChartData = dateRange.map((date) => ({
      label: date,
      count: voteChartData.find((entry) => entry._id === date)?.count || 0,
    }));

    // Get vote data for the previous 7 days
    const previousVoteChartData = await Vote.aggregate([
      {
        $match: {
          User: new ObjectId(userId),
          createdAt: {
            $gte: new Date(new Date() - 14 * 24 * 60 * 60 * 1000), // Previous 7 days
            $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // Last 14 days to Last 7 days
          },
        },
      },
      {
        $lookup: {
          from: 'polls',
          localField: 'Poll',
          foreignField: '_id',
          as: 'poll',
        },
      },
      {
        $unwind: '$poll',
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$poll.endDate' } },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalVoteInThisWeak = filledVoteChartData.reduce((acc, current) => acc + current.count, 0);
    const totalVoteInLastWeak = previousVoteChartData.reduce((acc, current) => acc + current.count, 0);

    // Calculating votes growth percentage
    let voteGrowthPercentage;
    if (totalVoteInLastWeak === 0) {
      voteGrowthPercentage = 100
    } else {
      voteGrowthPercentage = roundToDecimalPlaces(((Math.abs(totalVoteInThisWeak - totalVoteInLastWeak) / totalVoteInLastWeak) * 100), 2); // Growth percentage with respect to previous seven days
    }

    // Compare vote counts for the last 7 days and the previous 7 days
    const voteComparison = {
      totalNumber: lifetimeVotes,
      growth: totalVoteInThisWeak > totalVoteInLastWeak,
      growthPercentage: voteGrowthPercentage,
      thisWeek: totalVoteInThisWeak,
      lastWeek: totalVoteInLastWeak,
    };

    // Send the dashboard information as a response
    res.json({
      activePolls,
      totalPollsCreated: pollComparison,
      activePollVotes,
      lifetimeVotes: voteComparison,
      pollChartData: filledPollChartData,
      voteChartData: filledVoteChartData,
    });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
}
