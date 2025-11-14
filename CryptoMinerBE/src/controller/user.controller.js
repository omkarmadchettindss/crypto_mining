const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

exports.loginOrRegister = async (req, res) => {
  try {
    const { walletId } = req.body;

    if (!walletId) {
      return res.status(400).json({ message: "walletId is required" });
    }

    let user = await User.findOne({ walletId });

    if (!user) {
      user = await User.create({ walletId });
    }

    const token = generateToken({ walletId: user.walletId });

    res.json({
      message: "Success",
      token,
      walletId: user.walletId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
