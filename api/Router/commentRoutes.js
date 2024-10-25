const express = require("express")
const { createComment, deleteComment, commentCount, getAllComments } = require("../Controller/commentController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const demoRestrictionMiddleware = require("../middlewares/demoRestrictionMiddleware");

const router = express.Router()

router.route("/postComment/:pollId").put(isAuthenticatedUser, demoRestrictionMiddleware, createComment);
router.route("/deleteComment/:id").delete(isAuthenticatedUser, demoRestrictionMiddleware, deleteComment);
router.route("/commentCount/:pollId").get(commentCount);
router.route("/getComments/:pollId").get(getAllComments);



module.exports = router