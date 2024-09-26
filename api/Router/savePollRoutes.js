const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");
const { saveUnsave, isSaved, mySavedPolls } = require("../Controller/savePollController");

const router = express.Router();

router.route("/save-unsave/:pollId").put(isAuthenticatedUser, saveUnsave);
router.route("/isSaved/:pollId").get(isAuthenticatedUser, isSaved);
router.route("/saved-polls").get(isAuthenticatedUser, mySavedPolls);

module.exports = router;