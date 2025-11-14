// models/mining.model.js
const mongoose = require("mongoose");

const MiningSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },

  multiplier: {
    type: Number,
    default: 1,
  },

  status: {
    type: String,
    enum: ["mining", "completed", "ready_to_claim"],
    default: "mining",
  },

  miningStartTime: {
    type: Date,
    required: true,
  },

  currentMultiplierStartTime: {
    type: Date,
    required: true,
  },

  totalEarned: {
    type: Number,
    default: 0,
  },

  currentMiningPoints: {
    type: Number,
    default: 0,
  },

  lastUpdated: {
    type: Date,
    default: Date.now,
  },

  selectedHour: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Mining", MiningSchema);
