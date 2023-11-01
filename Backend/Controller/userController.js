const User = require("../Models/UserSchema");
const validator = require("validator");
const cloudinary = require("cloudinary");
const { sendErrorResponse } = require("../middlewares/erroHandle");
const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar, myStatus } = req.body;
    if (!name) return sendErrorResponse(res, 400, "Name is required");
    if (!email) return sendErrorResponse(res, 400, "Email is required");
    if (!password) return sendErrorResponse(res, 400, "Password is required");
    if (!avatar) return sendErrorResponse(res, 400, "Avatar is required");

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });
    if (!validator.isEmail(email))
      return sendErrorResponse(res, 400, "Invalid email");
    if (password.length < 8) {
      return sendErrorResponse(
        res,
        400,
        "Password must be atleast 8 characters"
      );
    }

    let user = await User.findOne({ email });
    if (user) return sendErrorResponse(res, 400, "User Already Exists");
    user = await User.create({
      name,
      email,
      password,
      myStatus,
      avatar: {
        public_id: " myCloud.public_id",
        url: "myCloud.secure_url",
      },
    });
    const token = user.generateToken();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
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
    const resetToken = await User.findOne({resetPasswordToken});
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
    const { name, email, avatar, myStatus } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;
    if (myStatus) user.myStatus = myStatus;
    if (avatar) {
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar = myCloud.secure_url;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
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
