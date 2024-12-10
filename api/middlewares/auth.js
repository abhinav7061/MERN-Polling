const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("./erroHandle");
const User = require("../Models/UserSchema");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req?.cookies?.token || req?.body?.token || req?.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return sendErrorResponse(res, 401, "Login first to access resources");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded._id) {
      return sendErrorResponse(res, 401, "Invalid token or token has expired");
    }

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404)
        .cookie("token", null, { expires: new Date(Date.now()) })
        .json({
          success: false,
          message: "user not found",
        });
    }
    if (!user.isVerified) {
      return sendErrorResponse(res, 404, "Verify Your Account");
    }
    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};


exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return sendErrorResponse(res, 403, "Access denied. Admin role required.");
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};
