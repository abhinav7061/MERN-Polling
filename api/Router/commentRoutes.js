const express = require("express")
const { createComment, deleteComment, commentCount, getAllComments } = require("../Controller/commentController");
const { isAuthenticatedUser } = require("../middlewares/auth")

const router = express.Router()

router.route("/postComment/:pollId").put(isAuthenticatedUser, createComment);
router.route("/deleteComment/:id").delete(isAuthenticatedUser, deleteComment);
router.route("/commentCount/:pollId").get(commentCount);
router.route("/getComments/:pollId").get(getAllComments);



module.exports = router