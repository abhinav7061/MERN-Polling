const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "title is required"],
    },
    onPoll: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
        required: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
})
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
