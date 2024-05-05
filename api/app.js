const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const ErrorHandling = require("./middlewares/error");

dotenv.config({ path: "config/config.env" });
app.use(express.json()); //middleware to understand json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// //importing routes
const user = require("./Router/userRoutes");
const poll = require("./Router/pollRoutes");
const vote = require("./Router/voteRoutes");
const comment = require("./Router/commentRoutes");
const followerFollowing = require("./Router/followerFollowingRoutes");

// //using routes
app.use("/api/v1/user", user);
app.use("/api/v1/poll", poll);
app.use("/api/v1/vote", vote);
app.use("/api/v1/comment", comment);
app.use("/api/v1/followers_followings", followerFollowing);
app.use('/api/v1/profile-image', express.static(__dirname + '/uploads/profile_image')); // route to  serve the static file(profile image in this project)

//using error middlewares
app.use(ErrorHandling);

module.exports = app;
