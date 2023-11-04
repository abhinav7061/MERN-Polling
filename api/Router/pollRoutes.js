const express=require("express")
const {createPoll, updatePoll, deletePoll, likeDislikePoll, commentOnPoll} =require("../Controller/pollController");
const {isAuthenticatedUser} = require("../middlewares/auth")

const router=express.Router()

router.route("/createPoll").post(isAuthenticatedUser,createPoll)
router.route("/updatePoll/:id").put(isAuthenticatedUser,updatePoll)
router.route("/delete/:id").delete(isAuthenticatedUser,deletePoll)
router.route("/like-dislike/:id").put(isAuthenticatedUser,likeDislikePoll)
router.route("/comment/:id").put(isAuthenticatedUser,commentOnPoll)

module.exports=router