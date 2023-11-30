const { sendErrorResponse } = require("../middlewares/erroHandle")
const Poll = require("../Models/PollSchema");
const User = require("../Models/UserSchema");
const Vote = require("../Models/VoteSchema");

exports.createPoll = async (req, res) => {
    try {
        const { title, description, options } = req.body;
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
        const poll = await Poll.create({ title, description, options, author: userId })
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
        const pollId = req.params.id
        const poll = await Poll.findByIdAndDelete(pollId);

        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found");
        }

        // Find and delete all votes associated with the deleted poll
        const votes = Vote.find({ Poll: pollId })
        await votes.deleteMany();

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

const getPollsByCriteria = async (req, res, options = {}) => {
    const perPage = 5;
    try {
        // Extract userId if includeUserFilter option is enabled and user exists in the request
        const userId = options.includeUserFilter && req.user ? req.user._id : null;

        // Get the current page from the request query, or default to 1
        const page = req.query.page || 1;

        // Get the search query from the request query
        const searchQuery = req.query.search;

        // Create a search filter using the search query
        const searchFilter = searchQuery
            ? {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { description: { $regex: searchQuery, $options: 'i' } },
                ],
            }
            : {};

        // Get the sort option from the request query, or default to 'newer'
        const sortOption = req.query.sort || 'newer';

        // Create a sort criteria object based on the sort option
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

        const currentDate = new Date();

        // Create a date filter based on the includeActiveFilter and includeClosedFilter options
        const dateFilter = options.includeActiveFilter
            ? { endDate: { $gte: currentDate } }
            : options.includeClosedFilter
                ? { endDate: { $lt: currentDate } }
                : {};

        // Create a filter object combining the userId, searchFilter, and dateFilter
        const filter = {
            ...(userId ? { author: userId } : {}),
            ...searchFilter,
            ...dateFilter,
        };

        // Execute an aggregation pipeline on the Poll collection
        const polls = await Poll.aggregate([
            {
                $match: filter,
            },
            {
                $addFields: {
                    totalVotes: { $sum: '$options.votes' },
                },
            },
            // Uncomment the following lines if you want to join the polls with the users collection
            // {
            //     $lookup: {
            //         from: 'users',
            //         localField: 'author',
            //         foreignField: '_id',
            //         as: 'authorInfo',
            //     },
            // },
            // {
            //     $unwind: '$authorInfo',
            // },
            // {
            //     $project: {
            //         _id: 1,
            //         title: 1,
            //         description: 1,
            //         options: 1,
            //         allowMultipleVotes: 1,
            //         startDate: 1,
            //         endDate: 1,
            //         tags: 1,
            //         likes: 1,
            //         comments: 1,
            //         createdAt: 1,
            //         // Fields from users collection which needed in the project
            //         'authorInfo._id': 1,
            //     },
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

        // Return the polls in the response
        res.status(200).json({
            success: true,
            polls,
        });
    } catch (error) {
        // If an error occurs, send an error response with a 500 status code and the error message
        sendErrorResponse(res, 500, error.message);
    }
};

exports.getAllPolls = async (req, res) => {
    await getPollsByCriteria(req, res);
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

