const User = require("../models/user.model");
const crypto = require("crypto");

// Generate unique referral code
function generateReferralCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

// Get user's referral code
exports.getReferralCode = async (req, res) => {
  try {
    const { walletId } = req.user;
    let user = await User.findOne({ walletId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate referral code if doesn't exist
    if (!user.referralCode) {
      let code = generateReferralCode();
      
      // Ensure uniqueness
      while (await User.findOne({ referralCode: code })) {
        code = generateReferralCode();
      }
      
      user.referralCode = code;
      await user.save();
    }

    res.json({
      referralCode: user.referralCode,
      referralEarnings: user.referralEarnings || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit referral code (for new users)
exports.submitReferralCode = async (req, res) => {
  try {
    const { walletId } = req.user;
    const { referralCode } = req.body;

    if (!referralCode) {
      return res.status(400).json({ message: "Referral code is required" });
    }

    const currentUser = await User.findOne({ walletId });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user already used a referral code
    if (currentUser.hasUsedReferral) {
      return res.status(400).json({ message: "You have already used a referral code" });
    }

    // Find the referrer
    const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() });

    if (!referrer) {
      return res.status(404).json({ message: "Invalid referral code" });
    }

    // Can't refer yourself
    if (referrer.walletId === walletId) {
      return res.status(400).json({ message: "You cannot use your own referral code" });
    }

    // Reward the referrer with 100 tokens
    const REFERRAL_REWARD = 100;
    referrer.totalEarned += REFERRAL_REWARD;
    referrer.referralEarnings = (referrer.referralEarnings || 0) + REFERRAL_REWARD;
    await referrer.save();

    // Mark current user as having used a referral
    currentUser.referredBy = referrer.walletId;
    currentUser.hasUsedReferral = true;
    await currentUser.save();

    res.json({
      message: "Referral code applied successfully",
      referrerRewarded: REFERRAL_REWARD,
      referrerWallet: referrer.walletId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check if user can use referral code
exports.canUseReferral = async (req, res) => {
  try {
    const { walletId } = req.user;
    const user = await User.findOne({ walletId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      canUseReferral: !user.hasUsedReferral,
      hasUsedReferral: user.hasUsedReferral,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
