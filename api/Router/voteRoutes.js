const express = require("express");
const { createVote, deleteVote, checkVote, myVotes } = require("../Controller/voteController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/checkVote/:pollId").get(isAuthenticatedUser, checkVote)
router.route("/myVotes").get(isAuthenticatedUser, myVotes)
router.route("/:pollId").post(isAuthenticatedUser, createVote);
router.route("/:pollId").delete(isAuthenticatedUser, deleteVote)

module.exports = router;
