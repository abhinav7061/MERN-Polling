const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
    text: String,
    votes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const pollSchema = new Schema({
    question: { type: String, required: true },
    options: [optionSchema],
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    voters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
