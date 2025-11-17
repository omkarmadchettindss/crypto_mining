const mongoose = require("mongoose");

const ReferralMiningRewardSchema = new mongoose.Schema({
  referrerWallet: {
    type: String,
    required: true,
    ref: "User",
  },
  referredWallet: {
    type: String,
    required: true,
    ref: "User",
  },
  miningSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mining",
    required: true,
  },
  referredUserEarned: {
    type: Number,
    required: true,
  },
  referrerReward: {
    type: Number,
    required: true,
  },
  rewardPercentage: {
    type: Number,
    default: 10,
  },
  claimedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for faster queries
ReferralMiningRewardSchema.index({ referrerWallet: 1 });
ReferralMiningRewardSchema.index({ referredWallet: 1 });
ReferralMiningRewardSchema.index({ miningSessionId: 1 });

module.exports = mongoose.model("ReferralMiningReward", ReferralMiningRewardSchema);
