// models/user.model.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    unique: true,
  },
  totalEarned: {
    type: Number,
    default: 0,
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
});

module.exports = mongoose.model("User", UserSchema);
