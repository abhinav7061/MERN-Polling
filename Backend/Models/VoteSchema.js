const mongoose = require('mongoose');

const voteSchema=new mongoose.Schema({
    Poll:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Poll",
        required:true
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    selectedOption:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Poll.options"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    // comments:{
    //     type:String,
    // }
})
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
