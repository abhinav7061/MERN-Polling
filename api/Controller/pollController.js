const { getPollsByCriteria } = require("../helper/getPollsByCriteria");
const { sendErrorResponse } = require("../middlewares/erroHandle")
const Poll = require("../Models/PollSchema");
const User = require("../Models/UserSchema");
const Vote = require("../Models/VoteSchema");
const Comment = require('../Models/CommentSchema');
const SavePoll = require("../Models/SavePollSchema");

exports.createPoll = async (req, res) => {
    try {
        const { title, description, options, endDate } = req.body;
        const userId = req.user._id;
        if (!title) {
            return sendErrorResponse(res, 401, "Title is required");
        }
        if (!description) {
            return sendErrorResponse(res, 401, "description is required");
        }
        if (!options || !Array.isArray(options)) {
            return sendErrorResponse(res, 401, "options is required");
        }
        if (options.length < 2) {
            return sendErrorResponse(res, 401, "At least 2 subjects is required");
        }
        let poll;
        if (!endDate) {
            poll = await Poll.create({ title, description, options, author: userId, })
        } else {
            poll = await Poll.create({ title, description, options, author: userId, endDate })
        }
        res.status(200).json({
            success: true,
            message: "Poll created Successfully",
            poll
        })
    } catch (error) {
        return sendErrorResponse(res, 500, error.message)
    }
}

exports.updatePoll = async (req, res) => {
    try {
        const fields = ["title", "description", "options", "startDate", "endDate", "tags"]
        const update = {}
        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                if (field === 'startDate' || field === 'endDate') {
                    update[field] = new Date(req.body[field])
                }
                else {
                    update[field] = req.body[field]
                }
            }
        })
        const pollId = req.params.id
        const poll = await Poll.findByIdAndUpdate(pollId, update, { new: true })
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found")
        }

        await Vote.deleteMany({ Poll: pollId });
        await Comment.deleteMany({ onPoll: pollId });
        await SavePoll.deleteMany({ pollId });

        res.status(200).json({
            success: true,
            message: "Poll updated successfully",
            poll
        })
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.deletePoll = async (req, res) => {
    try {
        const pollId = req.params.id
        const poll = await Poll.findByIdAndDelete(pollId);

        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found");
        }

        // Find and delete all votes associated with the deleted poll
        await Vote.deleteMany({ Poll: pollId });
        await Comment.deleteMany({ onPoll: pollId });
        await SavePoll.deleteMany({ pollId });

        res.status(200).json({
            success: true,
            message: "Poll deleted successfully"
        })
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.likeDislikePoll = async (req, res) => {
    try {
        const userId = req.user._id;
        const pollId = req.params.id;
        const poll = await Poll.findById(pollId)
        if (!poll) {
            return sendErrorResponse(res, 404, "Post not found");
        }
        if (poll.likes.includes(userId)) {
            let index = poll.likes.indexOf(userId)
            poll.likes.splice(index, 1);
            await poll.save()
            res.status(200).json({
                success: true,
                message: "DisLiked Post"
            })
        }
        else {
            poll.likes.unshift(userId);
            await poll.save()
            res.status(200).json({
                success: true,
                message: "Liked Post"
            })
        }

    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.getPoll = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id);

        if (!poll) return sendErrorResponse(res, 404, "Poll not found");

        res.status(200).json({
            success: true,
            poll,
        });
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

exports.getAllPolls = async (req, res) => {
    // Determine if active, closed, or all polls should be included
    const includeActiveFilter = req.query.active === 'active';
    const includeClosedFilter = req.query.active === 'closed';

    await getPollsByCriteria(req, res, {
        includeActiveFilter,
        includeClosedFilter
    });
};

// exports.myPolls is a controller function to handle requests to retrieve the current user's polls
exports.myPolls = async (req, res) => {
    // Check if user is logged in
    if (!req.user) {
        return sendErrorResponse(res, 400, "Login First");
    }

    // Determine if active, closed, or all polls should be included
    const includeActiveFilter = req.query.active === 'active';
    const includeClosedFilter = req.query.active === 'closed';

    // Fetch polls based on user and filter criteria
    await getPollsByCriteria(req, res, {
        includeUserFilter: true,
        includeActiveFilter,
        includeClosedFilter
    });
};

