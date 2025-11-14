const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    unique: true,
    ref: "User",
  },
  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },
  referredBy: {
    type: String,
    default: null,
  },
  referralEarnings: {
    type: Number,
    default: 0,
  },
  hasUsedReferral: {
    type: Boolean,
    default: false,
  },
  referredUsers: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Referral", ReferralSchema);
