const Mining = require("../models/mining.model");
const User = require("../models/user.model");
const MiningConfig = require("../models/miningConfig.model");
const AdReward = require("../models/adReward.model");
const Referral = require("../models/referral.model");
const ReferralMiningReward = require("../models/referralMiningReward.model");

const BASE_RATE = 0.01; // tokens per second
const REFERRAL_MINING_BONUS_PERCENTAGE = 10; // 10% bonus for referrer

exports.startMining = async (req, res) => {
  try {
    const { selectedHour, multiplier } = req.body;
    const wallet = req.user.walletId;

    if (!selectedHour) {
      return res.status(400).json({ message: "selectedHour is required" });
    }

    const config = await MiningConfig.findOne().lean();
    if (!config) {
      return res
        .status(500)
        .json({ message: "Mining configuration not found" });
    }

    const durationConfig = config.durations.find(
      (d) => d.hours === selectedHour
    );
    const multiplierConfig = config.multipliers.find(
      (m) => m.value === multiplier
    );

    if (!durationConfig || !multiplierConfig) {
      return res
        .status(400)
        .json({ message: "Invalid duration or multiplier" });
    }

    const rewardRate = multiplierConfig.rate; // e.g. 0.02/sec
    const durationSeconds = durationConfig.hours * 3600;
    const totalReward = rewardRate * durationSeconds;

    const existing = await Mining.findOne({ wallet, status: "mining" });
    if (existing) {
      return res.status(400).json({
        message: "Mining already active",
        mining: existing,
      });
    }

    const now = new Date();
    const miningSession = await Mining.create({
      wallet,
      selectedHour: durationConfig.hours,
      multiplier: multiplierConfig.value,
      miningStartTime: now,
      currentMultiplierStartTime: now,
      lastUpdated: now,
      currentMiningPoints: 0,
      totalEarned: 0,
      rewardRate,
      totalReward,
      status: "mining",
    });

    return res.json({
      message: "Mining started successfully",
      miningSession,
    });
  } catch (err) {
    console.error("Start mining error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.updateMultiplier = async (req, res) => {
  try {
    const { multiplier } = req.body;
    const wallet = req.user.walletId;

    const mining = await Mining.findOne({
      wallet,
      status: "mining",
    });

    if (!mining) {
      return res.status(404).json({ message: "No active mining" });
    }

    const now = new Date();

    const elapsedOld = Math.floor(
      (now - mining.currentMultiplierStartTime) / 1000
    );

    const tokensOld = elapsedOld * BASE_RATE * mining.multiplier;

    // Cap reward
    const totalSeconds = mining.selectedHour * 3600;
    const maxReward = totalSeconds * BASE_RATE * mining.multiplier;

    const updatedPoints = mining.currentMiningPoints + tokensOld;

    mining.currentMiningPoints = Math.min(updatedPoints, maxReward);
    mining.totalEarned = mining.currentMiningPoints;

    // Update multiplier
    mining.multiplier = multiplier;
    mining.currentMultiplierStartTime = now;
    mining.lastUpdated = now;

    await mining.save();

    res.json({
      message: "Multiplier updated",
      multiplier,
      earnedDuringOldMultiplier: tokensOld,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.finishMining = async (req, res) => {
  try {
    const wallet = req.user.walletId;

    const mining = await Mining.findOne({
      wallet,
      status: "mining",
    });

    if (!mining) {
      return res.status(404).json({ message: "No active mining session" });
    }

    const now = new Date();
    const start = mining.miningStartTime;
    const elapsed = Math.floor((now - start) / 1000);

    const totalSeconds = mining.selectedHour * 3600;
    const rewardRate = BASE_RATE * mining.multiplier;
    const maxReward = totalSeconds * rewardRate;

    // Use the SAME calculation as getCurrentMiningSession for consistency
    const finalReward = Math.min(elapsed * rewardRate, maxReward);

    mining.currentMiningPoints = finalReward;
    mining.totalEarned = finalReward;
    mining.status = "completed";
    mining.lastUpdated = now;

    await mining.save();

    // Update user balance
    const user = await User.findOne({ walletId: wallet });
    if (user) {
      user.totalEarned += finalReward;
      await user.save();
    }

    console.log(`✅ Mining finished for ${wallet}: ${finalReward} tokens`);

    // Check if this user was referred by someone
    const referral = await Referral.findOne({ walletId: wallet });
    let referrerBonus = 0;
    let referrerWallet = null;

    if (referral && referral.referredBy) {
      // Calculate 10% bonus for referrer
      referrerBonus = finalReward * (REFERRAL_MINING_BONUS_PERCENTAGE / 100);
      referrerWallet = referral.referredBy;

      // Update referrer's balance
      const referrerUser = await User.findOne({ walletId: referrerWallet });
      if (referrerUser) {
        referrerUser.totalEarned += referrerBonus;
        await referrerUser.save();
        console.log(`✅ Referrer ${referrerWallet} earned ${referrerBonus} tokens (10% of ${finalReward})`);
      }

      // Note: Mining rewards are NOT added to referralEarnings
      // They are tracked separately in ReferralMiningReward collection
      // referralEarnings only contains sign-up bonuses (100 tokens each)

      // Record this referral mining reward
      await ReferralMiningReward.create({
        referrerWallet: referrerWallet,
        referredWallet: wallet,
        miningSessionId: mining._id,
        referredUserEarned: finalReward,
        referrerReward: referrerBonus,
        rewardPercentage: REFERRAL_MINING_BONUS_PERCENTAGE,
        claimedAt: now,
      });

      console.log(`✅ Referral mining reward recorded: ${referrerBonus} tokens to ${referrerWallet}`);
    }

    return res.json({
      message: "Mining completed",
      rewardGained: finalReward,
      referralBonus: referrerBonus > 0 ? {
        referrerWallet: referrerWallet,
        bonusAmount: referrerBonus,
        percentage: REFERRAL_MINING_BONUS_PERCENTAGE,
      } : null,
    });
  } catch (err) {
    console.error("❌ Finish mining error:", err);
    return res.status(500).json({ message: err.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const wallet = req.user.walletId;
    const user = await User.findOne({ walletId: wallet });

    if (!user) return res.status(404).json({ message: "User not found" });

    let liveEarned = 0;
    const mining = await Mining.findOne({
      wallet,
      status: "mining",
    });

    if (mining) {
      const now = new Date();
      const start = mining.miningStartTime;
      const elapsed = (now - start) / 1000;
      const totalSeconds = mining.selectedHour * 3600;
      const rewardRate = BASE_RATE * mining.multiplier;
      const maxReward = totalSeconds * rewardRate;
      // Live earned ALWAYS capped
      liveEarned = Math.min(elapsed * rewardRate, maxReward);
    }

    // ✅ NEW: Aggregate total ad rewards
    const AdReward = require("../models/adReward.model");
    const adRewardResult = await AdReward.aggregate([
      { $match: { walletId: wallet } },
      {
        $group: {
          _id: null,
          totalAdRewards: { $sum: "$rewardedTokens" },
        },
      },
    ]);

    const totalAdRewards =
      adRewardResult.length > 0 ? adRewardResult[0].totalAdRewards : 0;

    // ✅ NEW: Calculate total balance including ad rewards
    const totalBalance = (user.totalEarned || 0) + liveEarned + totalAdRewards;

    return res.json({
      balance: totalBalance,
      liveEarned,
      miningEarnings: (user.totalEarned || 0) + liveEarned,
      adRewards: totalAdRewards,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getCurrentMiningSession = async (req, res) => {
  try {
    const wallet = req.user.walletId;

    const mining = await Mining.findOne({
      wallet,
      status: "mining",
    });

    if (!mining) {
      return res.json({ hasActiveSession: false });
    }

    const now = new Date();

    const start = mining.miningStartTime;
    const elapsed = (now - start) / 1000;

    const totalSeconds = mining.selectedHour * 3600;

    const rewardRate = BASE_RATE * mining.multiplier;

    const maxReward = totalSeconds * rewardRate;

    const earned = Math.min(elapsed * rewardRate, maxReward);

    // Store capped earned value consistently
    mining.totalEarned = earned;
    mining.currentMiningPoints = earned;
    await mining.save();

    const remaining = Math.max(0, totalSeconds - elapsed);

    return res.json({
      hasActiveSession: true,
      multiplier: mining.multiplier,
      selectedHour: mining.selectedHour,
      startTime: mining.miningStartTime,
      elapsedSeconds: elapsed,
      remainingSeconds: remaining,
      currentMined: earned,
      progressPercentage: Math.min((elapsed / totalSeconds) * 100, 100),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.claimAdReward = async (req, res) => {
  try {
    const { walletId } = req.user;

    // Generate random reward: 10, 20, 30, 40, 50, or 60 tokens
    const possibleRewards = [10, 20, 30, 40, 50, 60];
    const randomIndex = Math.floor(Math.random() * possibleRewards.length);
    const rewardedTokens = possibleRewards[randomIndex];

    // Save to adrewards collection
    const adReward = new AdReward({
      walletId,
      rewardedTokens,
      claimedAt: new Date(),
    });

    await adReward.save();

    res.status(200).json({
      success: true,
      message: "Ad reward claimed successfully",
      rewardedTokens,
      claimedAt: adReward.claimedAt,
    });
  } catch (error) {
    console.error("❌ Claim ad reward error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to claim ad reward",
      error: error.message,
    });
  }
};

exports.getReferralMiningRewards = async (req, res) => {
  try {
    const { walletId } = req.user;

    // Get all referral mining rewards where this user is the referrer
    const rewards = await ReferralMiningReward.find({ 
      referrerWallet: walletId 
    }).sort({ claimedAt: -1 }).limit(50);

    // Calculate total earned from referral mining
    const totalEarned = rewards.reduce((sum, reward) => sum + reward.referrerReward, 0);

    res.json({
      rewards,
      totalEarned,
      count: rewards.length,
    });
  } catch (error) {
    console.error("❌ Get referral mining rewards error:", error);
    res.status(500).json({ message: error.message });
  }
};
