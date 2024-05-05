const mongoose = require('mongoose');

const FollowerFollowingSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const FollowerFollowing = mongoose.model('FollowerFollowing', FollowerFollowingSchema);

module.exports = FollowerFollowing;