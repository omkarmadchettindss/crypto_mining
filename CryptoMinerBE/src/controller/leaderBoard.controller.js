const User = require("../models/user.model");
const Mining = require("../models/mining.model");
const AdReward = require("../models/adReward.model");

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({}, { walletId: 1, _id: 0 }).lean();

    // Get all ad rewards in one query for better performance
    const adRewardsAgg = await AdReward.aggregate([
      {
        $group: {
          _id: "$walletId",
          totalAdRewards: { $sum: "$rewardedTokens" },
        },
      },
    ]);

    // Create a map for quick lookup
    const adRewardsMap = {};
    adRewardsAgg.forEach((item) => {
      adRewardsMap[item._id] = item.totalAdRewards;
    });

    const usersWithLive = await Promise.all(
      users.map(async (u) => {
        const freshUser = await User.findOne(
          { walletId: u.walletId },
          { totalEarned: 1 }
        ).lean();

        const mining = await Mining.findOne({
          wallet: u.walletId,
          status: "mining",
        }).lean();

        let liveEarned = 0;
        let isMining = false;

        if (mining) {
          const now = new Date();
          const elapsed = (now - mining.miningStartTime) / 1000;
          const totalSeconds = mining.selectedHour * 3600;
          const rewardRate = 0.01 * mining.multiplier;
          const maxReward = totalSeconds * rewardRate;
          liveEarned = Math.min(elapsed * rewardRate, maxReward);
          isMining = true;
        }

        // Get ad rewards for this user
        const adRewards = adRewardsMap[u.walletId] || 0;

        // Calculate total: mining earnings + live earnings + ad rewards
        const totalEarned = (freshUser?.totalEarned || 0) + liveEarned + adRewards;

        return {
          walletId: u.walletId,
          totalEarned: totalEarned,
          miningEarnings: (freshUser?.totalEarned || 0) + liveEarned,
          adRewards: adRewards,
          isMining: isMining,
        };
      })
    );

    usersWithLive.sort((a, b) => b.totalEarned - a.totalEarned);

    const top20 = usersWithLive.slice(0, 20);

    return res.json({
      message: "Leaderboard fetched successfully",
      leaderboard: top20,
    });
  } catch (err) {
    console.error("Leaderboard fetch error:", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
