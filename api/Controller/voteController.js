const Poll = require("../Models/PollSchema");
const Vote = require("../Models/VoteSchema");
const { sendErrorResponse } = require("../middlewares/erroHandle");

exports.createVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const pollId = req.params.pollId;
    let selectedOptionId = req.body.selectedOptionId;

    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return sendErrorResponse(res, 404, "Poll not found");
    }

    if (!poll.allowMultipleVotes) {
      const existingVote = await Vote.findOne({ Poll: pollId, User: userId });

      if (existingVote) {
        return sendErrorResponse(res, 403, "You have already voted");
      }
    }
    const selectedOption = poll.options.id(selectedOptionId);
    if (!selectedOption) {
      return sendErrorResponse(res, 400, "Invalid Options selected");
    }
    const existingVote = await Vote.findOne({
      Poll: pollId,
      User: userId,
      selectedOption: selectedOptionId,
    });

    if (existingVote) {
      return sendErrorResponse(res, 403, `You have already voted on this ${selectedOptionId}`);
    }
    const newVote = new Vote({
      Poll: pollId,
      User: userId,
      selectedOption: selectedOptionId,
    });
    await newVote.save();
    selectedOption.votes += 1;
    await poll.save();

    const totalVotes = poll.options.reduce(
      (sum, option) => sum + option.votes,
      0
    );
    poll.options.forEach((option) => {
      option.progress = (option.votes / totalVotes) * 100;
    });
    await poll.save();

    res.status(200).json({
      success: true,
      message: "vote submitted successfully",
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.deleteVote = async (req, res) => {
  try {
    const voteId = req.params.voteId;
    const userId = req.user._id;

    const vote = await Vote.findOne({ _id: voteId, User: userId });

    if (!vote) {
      return sendErrorResponse(res, 404, "Vote not found");
    }

    const poll = await Poll.findOne({ _id: vote.Poll });
    if (!poll) {
      return sendErrorResponse(res, 404, "Poll not found");
    }

    const selectedOption = poll.options.id(vote.selectedOption);
    if (selectedOption) {
      selectedOption.votes -= 1;
    }
    await vote.deleteOne();

    const totalVotes = poll.options.reduce(
      (sum, option) => sum + option.votes,
      0
    );
    poll.options.forEach((option) => {
      option.progress = (option.votes / totalVotes) * 100;
    });
    await poll.save();

    res
      .status(200)
      .json({ success: true, message: "Vote deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

