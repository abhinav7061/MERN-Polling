const express = require("express");
const User = require("../Models/UserSchema");
const Poll = require("../Models/PollSchema");
const Vote = require("../Models/VoteSchema");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  getAllUsers,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
  updateRole,
  deleteProfile,
  myProfile,
  getDashboard,
} = require("../Controller/userController");
const { isAuthenticatedUser, isAdmin } = require("../middlewares/auth");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route('/dashboard/:id').get(isAuthenticatedUser, getDashboard);
router.route("/register").post(upload.single('avatar'), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/allusers").get(getAllUsers);
router.route("/me").get(isAuthenticatedUser, myProfile);
router.route("/:id").get(isAuthenticatedUser, getUserDetails);
router.route("/profile/update").put(isAuthenticatedUser, upload.single('avatar'), updateProfile);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/role-update/:id").put(updateRole)
router.route("/delete-profile/:id").delete(isAuthenticatedUser, isAdmin, deleteProfile)

module.exports = router;
