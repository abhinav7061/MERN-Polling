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
const allowedOrigins = process.env.FRONTEND_URLS.split(',');

// Configure CORS to allow requests from the allowed origins
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// //importing routes
const user = require("./Router/userRoutes");
const poll = require("./Router/pollRoutes");
const vote = require("./Router/voteRoutes");
const comment = require("./Router/commentRoutes");
const followerFollowing = require("./Router/followerFollowingRoutes");
const savePoll = require("./Router/savePollRoutes");

// //using routes
app.use("/api/v1/user", user);
app.use("/api/v1/poll", poll);
app.use("/api/v1/vote", vote);
app.use("/api/v1/comment", comment);
app.use("/api/v1/followers_followings", followerFollowing);
app.use("/api/v1/save-poll", savePoll);

app.get('/', (req, res) => {
    res.send('Welcome to the Echoes-Insights API!');
});

// Handle undefined routes
app.use((req, res, next) => {
    const error = new Error(`Cannot find Resource on this server!`);
    error.statusCode = 404;
    next(error);
});

//using error middlewares
app.use(ErrorHandling);

module.exports = app;
