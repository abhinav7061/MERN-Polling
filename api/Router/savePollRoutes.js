const express = require("express");

const { isAuthenticatedUser } = require("../middlewares/auth");
const { saveUnsave, isSaved, mySavedPolls } = require("../Controller/savePollController");
const demoRestrictionMiddleware = require("../middlewares/demoRestrictionMiddleware");

const router = express.Router();

router.route("/save-unsave/:pollId").put(isAuthenticatedUser, demoRestrictionMiddleware, saveUnsave);
router.route("/isSaved/:pollId").get(isAuthenticatedUser, isSaved);
router.route("/saved-polls").get(isAuthenticatedUser, mySavedPolls);

module.exports = router;