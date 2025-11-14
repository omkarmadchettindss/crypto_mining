const mongoose = require('mongoose');

const adRewardSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    index: true,
  },
  rewardedTokens: {
    type: Number,
    required: true,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
adRewardSchema.index({ walletId: 1, claimedAt: -1 });

module.exports = mongoose.model('AdReward', adRewardSchema);