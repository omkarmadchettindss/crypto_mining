const User = require("../models/user.model");
const Referral = require("../models/referral.model");
const ReferralMiningReward = require("../models/referralMiningReward.model");
const crypto = require("crypto");

// Generate unique referral code
function generateReferralCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

// Get user's referral code
exports.getReferralCode = async (req, res) => {
  try {
    const { walletId } = req.user;
    
    // Check if user exists
    const user = await User.findOne({ walletId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find or create referral record
    let referral = await Referral.findOne({ walletId });
    
    if (!referral) {
      // Create new referral record
      referral = new Referral({ walletId });
    }

    // Generate referral code if doesn't exist
    if (!referral.referralCode) {
      let code = generateReferralCode();
      
      // Ensure uniqueness
      while (await Referral.findOne({ referralCode: code })) {
        code = generateReferralCode();
      }
      
      referral.referralCode = code;
      await referral.save();
    }

    // Get total mining rewards from referred users
    const miningRewards = await ReferralMiningReward.aggregate([
      { $match: { referrerWallet: walletId } },
      {
        $group: {
          _id: null,
          totalMiningRewards: { $sum: "$referrerReward" },
          miningRewardCount: { $sum: 1 },
        },
      },
    ]);

    const totalMiningRewards = miningRewards.length > 0 ? miningRewards[0].totalMiningRewards : 0;
    const miningRewardCount = miningRewards.length > 0 ? miningRewards[0].miningRewardCount : 0;

    res.json({
      referralCode: referral.referralCode,
      referralEarnings: referral.referralEarnings || 0,
      referredUsers: referral.referredUsers || [],
      referredCount: (referral.referredUsers || []).length,
      miningRewards: {
        total: totalMiningRewards,
        count: miningRewardCount,
      },
      totalEarnings: (referral.referralEarnings || 0) + totalMiningRewards,
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

    // Check if current user exists
    const currentUser = await User.findOne({ walletId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find or create current user's referral record
    let currentUserReferral = await Referral.findOne({ walletId });
    if (!currentUserReferral) {
      currentUserReferral = new Referral({ walletId });
    }

    // Check if user already used a referral code
    if (currentUserReferral.hasUsedReferral) {
      return res.status(400).json({ message: "You have already used a referral code" });
    }

    // Find the referrer by referral code
    const referrerReferral = await Referral.findOne({ 
      referralCode: referralCode.toUpperCase() 
    });

    if (!referrerReferral) {
      return res.status(404).json({ message: "Invalid referral code" });
    }

    // Can't refer yourself
    if (referrerReferral.walletId === walletId) {
      return res.status(400).json({ message: "You cannot use your own referral code" });
    }

    // Find referrer user to update totalEarned
    const referrerUser = await User.findOne({ walletId: referrerReferral.walletId });
    if (!referrerUser) {
      return res.status(404).json({ message: "Referrer user not found" });
    }

    // Reward the referrer with 100 tokens
    const REFERRAL_REWARD = 100;
    referrerUser.totalEarned += REFERRAL_REWARD;
    await referrerUser.save();

    // Update referrer's referral record
    referrerReferral.referralEarnings = (referrerReferral.referralEarnings || 0) + REFERRAL_REWARD;
    
    if (!referrerReferral.referredUsers) {
      referrerReferral.referredUsers = [];
    }
    if (!referrerReferral.referredUsers.includes(walletId)) {
      referrerReferral.referredUsers.push(walletId);
    }
    await referrerReferral.save();

    // Mark current user as having used a referral
    currentUserReferral.referredBy = referrerReferral.walletId;
    currentUserReferral.hasUsedReferral = true;
    await currentUserReferral.save();

    res.json({
      message: "Referral code applied successfully",
      referrerRewarded: REFERRAL_REWARD,
      referrerWallet: referrerReferral.walletId,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check if user can use referral code
exports.canUseReferral = async (req, res) => {
  try {
    const { walletId } = req.user;
    
    // Check if user exists
    const user = await User.findOne({ walletId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find or create referral record
    let referral = await Referral.findOne({ walletId });
    if (!referral) {
      referral = new Referral({ walletId });
      await referral.save();
    }

    res.json({
      canUseReferral: !referral.hasUsedReferral,
      hasUsedReferral: referral.hasUsedReferral,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
