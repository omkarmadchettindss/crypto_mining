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
});

module.exports = mongoose.model("User", UserSchema);
