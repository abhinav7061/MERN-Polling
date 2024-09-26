const mongoose = require('mongoose');

const savePollSchema = new mongoose.Schema({
    pollId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

const SavePoll = mongoose.model('SavePoll', savePollSchema);

module.exports = SavePoll;
