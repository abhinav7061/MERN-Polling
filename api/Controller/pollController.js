const { sendErrorResponse } = require("../middlewares/erroHandle")
const Poll = require("../Models/PollSchema");
const User = require("../Models/UserSchema");

exports.createPoll = async (req, res) => {
    try {
        const { title, description, options } = req.body;
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
        const poll = await Poll.create({ title, description, options })
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
                    update[field] = new Date(req.body.field)
                }
                else {
                    update[field] = req.body[field]
                }
            }
        })
        const poll = await Poll.findByIdAndUpdate(req.params.id, update, { new: true })
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found")
        }

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
        const poll = await Poll.findByIdAndDelete(req.params.id);
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found");
        }
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

exports.commentOnPoll = async (req, res) => {
    try {
        const pollId = req.params.id;
        const userId = req.user._id;
        const { comment } = req.body;
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found")
        }
        let commentIndex = -1;
        poll.comments.forEach((item, index) => {
            if (item.user.toString() === userId.toString()) {
                commentIndex = index;
            }
        })

        if (commentIndex !== -1) {
            //update comment
            poll.comments[commentIndex].comment = comment
            await poll.save();
            res.status(200).json({
                success: true,
                message: "Comment updated"
            })
        }
        else {
            //add new comment
            poll.comments.unshift({
                user: userId,
                comment
            })
            await poll.save();
            res.status(200).json({
                success: true,
                message: "Comment added"
            })
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.getAllPolls = async (req, res) => {
    const perPage = 5;
    // console.log(req.query);
    try {
        const page = req.query.page || 1;

        // Search
        const searchQuery = req.query.search;
        const searchFilter = searchQuery
            ? {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } },
                ],
            }
            : {};

        // Sorting
        const sortOption = req.query.sort || 'newer';
        let sortCriteria = {};
        if (sortOption === 'older') {
            sortCriteria = { createdAt: 1 };
        } else if (sortOption === 'newer') {
            sortCriteria = { createdAt: -1 };
        } else if (sortOption === 'likes') {
            sortCriteria = { likes: -1 };
        } else if (sortOption === 'votes') {
            sortCriteria = { totalVotes: -1 };
        }

        const polls = await Poll.aggregate([
            {
                $match: searchFilter,
            },
            {
                $addFields: {
                    totalVotes: { $sum: '$options.votes' },
                },
            },
            // {
            //     $lookup: {
            //         from: 'User',
            //         localField: 'author',
            //         foreignField: '_id',
            //         as: 'authorInfo',
            //     },
            // },
            // {
            //     $unwind: '$authorInfo',
            // },
            {
                $sort: sortCriteria,
            },
            {
                $skip: (page - 1) * perPage,
            },
            {
                $limit: perPage,
            },
        ]);

        res.status(200).json({
            success: true,
            polls,
        });
        console.log({ polls, page, searchQuery, searchFilter, sortOption });
    } catch (error) {
        return sendErrorResponse(res, 500, error.message);
    }
};

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