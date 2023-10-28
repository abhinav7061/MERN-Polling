const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: 'Poll', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    option: { type: Number, required: true }, // Index of the chosen option
    createdAt: { type: Date, default: Date.now },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
