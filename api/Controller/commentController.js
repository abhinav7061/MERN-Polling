const { sendErrorResponse } = require("../middlewares/erroHandle");
const Poll = require("../Models/PollSchema");
const User = require("../Models/UserSchema");
const Vote = require("../Models/VoteSchema");
const Comment = require('../Models/CommentSchema');

exports.createComment = async (req, res) => {
    try {
        const pollId = req.params.pollId;
        const userId = req.user._id;
        const { comment } = req.body;
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found")
        }
        // Check if the user has already commented on the poll
        const existingComment = await Comment.findOne({ onPoll: pollId, commentedBy: userId });

        if (existingComment) {
            // Update the existing comment
            existingComment.comment = comment;
            await existingComment.save();
            res.status(200).json({ success: true, message: 'Comment updated', updatedComment: existingComment });
        } else {
            // Create a new comment
            const newComment = new Comment({
                comment,
                onPoll: pollId,
                commentedBy: userId
            });

            // Save the new comment to the database
            await newComment.save();

            res.status(200).json({ success: true, message: 'Comment added', newComment });
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.deleteComment = async (req, res) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return sendErrorResponse(res, 404, "Comment not found");
        }

        res.status(200).json({ success: true, message: 'Comment Deleted' });
    } catch (err) {
        console.log(err.message);
        sendErrorResponse(res, 500, "Server Error")
    }
};

exports.commentCount = async (req, res) => {
    const pollId = req.params.pollId;

    try {
        // Count the number of comments for the specified poll ID
        const count = await Comment.countDocuments({ onPoll: pollId });
        res.status(200).json({ success: true, count });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
}

// Get all comments from a specific poll
exports.getAllComments = async (req, res) => {
    const { pollId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3; // Default limit is 3

    try {
        const skip = (page - 1) * limit;

        // Query comments for the specified poll ID with pagination
        const comments = await Comment.find({ onPoll: pollId })
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 }); // Sort comments by creation date in descending order

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error('Error while fetching comments:', error);
        return sendErrorResponse(res, 500, error.message);
    }
}