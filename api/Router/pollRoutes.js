const express = require("express")
const { createPoll, updatePoll, deletePoll, likeDislikePoll, myPolls, getAllPolls, getPoll } = require("../Controller/pollController");
const { isAuthenticatedUser } = require("../middlewares/auth")
const demoRestrictionMiddleware = require("../middlewares/demoRestrictionMiddleware");

const router = express.Router()

router.route("/createPoll").post(isAuthenticatedUser, demoRestrictionMiddleware, createPoll)
router.route("/updatePoll/:id").put(isAuthenticatedUser, demoRestrictionMiddleware, updatePoll)
router.route("/delete/:id").delete(isAuthenticatedUser, demoRestrictionMiddleware, deletePoll)
router.route("/like-dislike/:id").put(isAuthenticatedUser, demoRestrictionMiddleware, likeDislikePoll)
router.route("/myPolls").get(isAuthenticatedUser, myPolls)
router.route("/getPoll/:id").get(isAuthenticatedUser, getPoll)
router.route("/allPolls").get(isAuthenticatedUser, getAllPolls)

module.exports = router