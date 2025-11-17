const User = require("../models/user.model");
const Mining = require("../models/mining.model");
const Referral = require("../models/referral.model");
const ReferralMiningReward = require("../models/referralMiningReward.model");
const AdReward = require("../models/adReward.model");

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    
    // Total users
    const totalUsers = await User.countDocuments();

    // Total tokens distributed
    const totalTokensResult = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$totalEarned" } } },
    ]);
    const totalTokens = totalTokensResult.length > 0 ? totalTokensResult[0].total : 0;

    // Active mining sessions
    const activeMining = await Mining.countDocuments({ status: "mining" });

    // Completed mining sessions
    const completedMining = await Mining.countDocuments({ status: "completed" });

    // Total referrals
    const totalReferrals = await Referral.countDocuments({ hasUsedReferral: true });

    // Recent activity (last 7 days) - using ObjectId timestamp
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Create ObjectId from timestamp for comparison
    const sevenDaysAgoId = mongoose.Types.ObjectId.createFromTime(
      Math.floor(sevenDaysAgo.getTime() / 1000)
    );

    const recentUsers = await User.countDocuments({
      _id: { $gte: sevenDaysAgoId },
    });

    // Daily active users for the last 7 days
    const dailyActiveUsers = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const startId = mongoose.Types.ObjectId.createFromTime(
        Math.floor(date.getTime() / 1000)
      );
      const endId = mongoose.Types.ObjectId.createFromTime(
        Math.floor(nextDate.getTime() / 1000)
      );

      // Count users who had mining activity on this day
      const activeCount = await Mining.countDocuments({
        _id: { $gte: startId, $lt: endId },
      });

      dailyActiveUsers.push({
        date: date.toISOString().split('T')[0],
        users: activeCount,
        day: date.toLocaleDateString('en-US', { weekday: 'short' })
      });
    }

    console.log("Dashboard Stats:", {
      totalUsers,
      totalTokens,
      activeMining,
      completedMining,
      totalReferrals,
      recentUsers,
      dailyActiveUsers,
    });

    res.json({
      totalUsers,
      totalTokens,
      activeMining,
      completedMining,
      totalReferrals,
      recentUsers,
      dailyActiveUsers,
    });
  } catch (err) {
    console.error("Error in getDashboardStats:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get all users with pagination
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .sort({ totalEarned: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    // Get referral info for each user
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const referral = await Referral.findOne({ walletId: user.walletId });
        const activeMining = await Mining.findOne({
          wallet: user.walletId,
          status: "mining",
        });

        return {
          ...user.toObject(),
          referralCode: referral?.referralCode || null,
          referredCount: referral?.referredUsers?.length || 0,
          hasActiveMining: !!activeMining,
        };
      })
    );

    res.json({
      users: usersWithDetails,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const { walletId } = req.params;

    const user = await User.findOne({ walletId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const referral = await Referral.findOne({ walletId });
    const miningSessions = await Mining.find({ wallet: walletId }).sort({
      miningStartTime: -1,
    });
    const adRewards = await AdReward.find({ walletId }).sort({ claimedAt: -1 });
    const referralMiningRewards = await ReferralMiningReward.find({
      referrerWallet: walletId,
    }).sort({ claimedAt: -1 });

    res.json({
      user: user.toObject(),
      referral: referral?.toObject() || null,
      miningSessions,
      adRewards,
      referralMiningRewards,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all mining sessions
exports.getAllMiningSessions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    const status = req.query.status; // 'mining', 'completed', or undefined for all

    const query = status ? { status } : {};

    const sessions = await Mining.find(query)
      .sort({ miningStartTime: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Mining.countDocuments(query);

    console.log(`Mining sessions query: page=${page}, limit=${limit}, status=${status}, total=${total}, returned=${sessions.length}`);

    res.json({
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching mining sessions:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get mining statistics
exports.getMiningStats = async (req, res) => {
  try {
    // Total mining sessions
    const totalSessions = await Mining.countDocuments();

    // Active sessions
    const activeSessions = await Mining.countDocuments({ status: "mining" });

    // Completed sessions
    const completedSessions = await Mining.countDocuments({ status: "completed" });

    // Total tokens mined
    const totalMinedResult = await Mining.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalEarned" } } },
    ]);
    const totalMined = totalMinedResult.length > 0 ? totalMinedResult[0].total : 0;

    // Average mining duration
    const avgDurationResult = await Mining.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, avg: { $avg: "$selectedHour" } } },
    ]);
    const avgDuration = avgDurationResult.length > 0 ? avgDurationResult[0].avg : 0;

    res.json({
      totalSessions,
      activeSessions,
      completedSessions,
      totalMined,
      avgDuration,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get payment/rewards statistics
exports.getPaymentStats = async (req, res) => {
  try {
    // Total ad rewards
    const totalAdRewardsResult = await AdReward.aggregate([
      { $group: { _id: null, total: { $sum: "$rewardedTokens" } } },
    ]);
    const totalAdRewards = totalAdRewardsResult.length > 0 ? totalAdRewardsResult[0].total : 0;

    // Total referral sign-up bonuses
    const totalReferralBonusResult = await Referral.aggregate([
      { $group: { _id: null, total: { $sum: "$referralEarnings" } } },
    ]);
    const totalReferralBonus = totalReferralBonusResult.length > 0 ? totalReferralBonusResult[0].total : 0;

    // Total referral mining rewards
    const totalReferralMiningResult = await ReferralMiningReward.aggregate([
      { $group: { _id: null, total: { $sum: "$referrerReward" } } },
    ]);
    const totalReferralMining = totalReferralMiningResult.length > 0 ? totalReferralMiningResult[0].total : 0;

    // Recent ad rewards
    const recentAdRewards = await AdReward.find()
      .sort({ claimedAt: -1 })
      .limit(10);

    // Recent referral rewards
    const recentReferralRewards = await ReferralMiningReward.find()
      .sort({ claimedAt: -1 })
      .limit(10);

    res.json({
      totalAdRewards,
      totalReferralBonus,
      totalReferralMining,
      totalRewards: totalAdRewards + totalReferralBonus + totalReferralMining,
      recentAdRewards,
      recentReferralRewards,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
