const express = require("express");
const { createVote, deleteVote } = require("../Controller/voteController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/:pollId").post(isAuthenticatedUser,createVote);
router.route("/:voteId").delete(isAuthenticatedUser,deleteVote)

module.exports = router;
