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
    const date = new Date(poll.endDate).toISOString();
    // Checking whether the voting period is over or not
    if (new Date() > new Date(date)) {
      return sendErrorResponse(res, 403, "The voting time has been expired.");
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
    const pollId = req.params.pollId;
    const userId = req.user._id;

    const vote = await Vote.findOne({ Poll: pollId, User: userId });

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

    // Check if totalVotes is greater than 0 before calculating progress
    if (totalVotes > 0) {
      poll.options.forEach((option) => {
        option.progress = (option.votes / totalVotes) * 100;
      });
    } else {
      // If totalVotes is 0, set progress to 0 for all options
      poll.options.forEach((option) => {
        option.progress = 0;
      });
    }

    await poll.save();

    res
      .status(200)
      .json({ success: true, message: "Vote deleted successfully" });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.checkVote = async (req, res) => {
  try {
    const userId = req.user._id;
    const pollId = req.params.pollId;

    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return sendErrorResponse(res, 404, "Poll not found");
    }

    // Find the vote (if any) by user and poll IDs
    const vote = await Vote.findOne({
      Poll: pollId,
      User: userId,
    });

    // If vote exists, return vote data
    if (vote) {
      res.status(200).json({
        success: true,
        message: "You have voted on this poll",
        vote,
        voted: true
      });
    } else {
      // If vote doesn't exist, return voting status
      res.status(200).json({
        success: true,
        message: "You have not voted on this poll",
        voted: false
      });
    }
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}

exports.myVotes = async (req, res) => {
  try {
    const userId = req.user._id;

    // Set pagination options
    const page = req.query.page || 1;
    const limit = 5;

    // Handle search query
    const search = req.query.search;
    const searchQuery = { $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] };

    // Define sorting options
    const sortOption = req.query.sort || 'newer';
    let sortCriteria;
    if (sortOption === 'older') {
      sortCriteria = { createdAt: 1 };
    } else if (sortOption === 'newer') {
      sortCriteria = { createdAt: -1 };
    } else if (sortOption === 'likes') {
      sortCriteria = { likes: -1 };
    } else if (sortOption === 'votes') {
      sortCriteria = { totalVotes: -1 };
    }

    // Fetch user votes and associated polls
    const userVotes = await Vote.find({ User: userId })
      .populate({
        path: "Poll",
        match: searchQuery,
        options: { sort: sortCriteria, skip: (page - 1) * limit, limit: limit },
      });

    // Filter out votes without associated polls
    const userVotedPolls = userVotes
      .filter(vote => vote.Poll !== null);

    // Map filtered votes to polls
    const polls = userVotedPolls.map((vote) => vote.Poll);

    // Send polls as response
    res.status(200).json({
      success: true,
      polls,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}

exports.getVoters = async (req, res) => {
  try {
    const pollId = req.query.poll;

    const votes = await Vote.find({ Poll: pollId })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('User')  // Populate the 'User' field
      .exec();

    if (!votes) {
      return sendErrorResponse(res, 404, 'votes not found on this pol')
    }
    // Extract user information from votes
    const voters = votes.map(vote => vote.User);

    res.status(200).json({
      success: true,
      voters,
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
}