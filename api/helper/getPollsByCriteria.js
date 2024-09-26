const { sendErrorResponse } = require("../middlewares/erroHandle");
const Poll = require("../Models/PollSchema");

exports.getPollsByCriteria = async (req, res, options = {}) => {
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
            ...(userId ? { author: userId } : options.pollIds ? { _id: { $in: options.pollIds } } : {}),
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