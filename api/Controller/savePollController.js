const SavePoll = require("../Models/SavePollSchema");
const Poll = require("../Models/PollSchema");
const { sendErrorResponse } = require("../middlewares/erroHandle");
const { getPollsByCriteria } = require("../helper/getPollsByCriteria");

exports.saveUnsave = async (req, res) => {
    try {
        const userId = req.user._id;
        const pollId = req.params.pollId;
        const poll = await Poll.findById(pollId)
        if (!poll) {
            return sendErrorResponse(res, 404, "Poll not found");
        }
        const savePoll = await SavePoll.findOne({ userId, pollId });
        if (savePoll) {
            await SavePoll.findOneAndDelete({ userId, pollId });
            return res.send({ success: true, message: "Poll Removed From Saves" });
        } else {
            await SavePoll.create({ pollId, userId });
            return res.send({ success: true, message: "Poll Saved" })
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message)
    }
}

exports.isSaved = async (req, res) => {
    try {
        const userId = req.user._id;
        const pollId = req.params.pollId;
        const poll = await Poll.findById(pollId);
        if (!poll) {
            return sendErrorResponse(res, 404, "Post not found");
        }
        const savePoll = await SavePoll.findOne({ userId, pollId });
        if (savePoll) {
            return res.send({ success: true, isSaved: true });
        } else {
            return res.send({ success: true, isSaved: false });
        }
    } catch (error) {
        sendErrorResponse(res, 500, error.message);
    }
}

exports.mySavedPolls = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch saved poll IDs for the user
        const savedPolls = await SavePoll.find({ userId });

        // Filter out savedPolls without associated polls
        const userSavedPolls = savedPolls.filter(save => save.pollId !== null);

        // Map filtered savedPolls to polls
        const pollIds = userSavedPolls.map((save) => save.pollId);

        const includeActiveFilter = req.query.active === 'active';
        const includeClosedFilter = req.query.active === 'closed';

        // Fetch polls based on user and filter criteria
        await getPollsByCriteria(req, res, {
            includeActiveFilter,
            includeClosedFilter,
            pollIds
        });
    } catch (error) {
        // If an error occurs, send an error response with a 500 status code and the error message
        sendErrorResponse(res, 500, error.message);
    }
};

