const express = require("express")
const { createPoll, updatePoll, deletePoll, likeDislikePoll, myPolls, getAllPolls, getPoll } = require("../Controller/pollController");
const { isAuthenticatedUser } = require("../middlewares/auth")

const router = express.Router()

router.route("/createPoll").post(isAuthenticatedUser, createPoll)
router.route("/updatePoll/:id").put(isAuthenticatedUser, updatePoll)
router.route("/delete/:id").delete(isAuthenticatedUser, deletePoll)
router.route("/like-dislike/:id").put(isAuthenticatedUser, likeDislikePoll)
router.route("/myPolls").get(isAuthenticatedUser, myPolls)
router.route("/getPoll/:id").get(getPoll)
router.route("/allPolls").get(getAllPolls)

module.exports = router