const mongoose = require("mongoose");

const DurationSchema = new mongoose.Schema(
  {
    hours: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { _id: false }
);

const MultiplierSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true },
    rate: { type: Number, required: true },
    reward1h: { type: Number, required: true },
  },
  { _id: false }
);

const MiningConfigSchema = new mongoose.Schema(
  {
    version: { type: Number, default: 1 },
    durations: { type: [DurationSchema], required: true },
    multipliers: { type: [MultiplierSchema], required: true },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MiningConfig", MiningConfigSchema);
