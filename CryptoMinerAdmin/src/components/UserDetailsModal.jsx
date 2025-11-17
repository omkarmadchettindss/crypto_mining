import { useEffect, useState } from "react";
import { X, Wallet, TrendingUp, Gift, Pickaxe, User } from "lucide-react";
import axios from "axios";

const UserDetailsModal = ({ walletId, onClose }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (walletId) {
      fetchUserDetails();
    }
  }, [walletId]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/admin/users/${walletId}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const formatDate = (date) => new Date(date).toLocaleString();

  if (!walletId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-black/80 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-700/50 animate-fadeInScale">
        {/* Enhanced Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-8 flex items-center justify-between relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative flex items-center gap-6">
            {/* Enhanced Profile Picture */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-2xl backdrop-blur-sm">
                <User className="w-10 h-10" />
              </div>
              {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              </div> */}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">User Details</h2>
              <p className="text-blue-100 text-sm flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                <Wallet className="w-4 h-4" />
                {formatAddress(walletId)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="relative p-3 hover:bg-white/20 rounded-xl transition-all hover:scale-110 active:scale-95 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)] bg-gradient-to-b from-transparent to-gray-900/20">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : userData ? (
            <div className="space-y-6">
              {/* Enhanced Profile Section */}
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-600/50 flex items-center gap-8 shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 border-4 border-gray-700">
                    <User className="w-14 h-14 text-white" />
                  </div>
                  {/* <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white shadow-lg">
                    Active
                  </div> */}
                </div>
                <div className="flex-1 relative">
                  {/* <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    User Profile
                  </h3> */}
                  <p className="text-gray-300 flex items-center gap-2 mb-4 bg-gray-700/50 px-4 py-2 rounded-xl w-fit">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="font-mono text-sm">{walletId}</span>
                  </p>
                  <div className="flex gap-6 text-sm">
                    <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 px-4 py-2 rounded-xl border border-green-500/30">
                      <span className="text-gray-400 block text-xs mb-1">Total Earned</span>
                      <span className="font-bold text-xl text-green-400">
                        {userData.user.totalEarned.toFixed(2)}
                      </span>
                      <span className="text-green-400 text-xs ml-1">tokens</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all hover-scale relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      Total Earned
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {userData.user.totalEarned.toFixed(2)}
                  </p>
                  <p className="text-xs text-green-400">tokens</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all hover-scale relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Gift className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      Referral Code
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {userData.referral?.referralCode || "N/A"}
                  </p>
                  <p className="text-xs text-purple-400">
                    {userData.referral?.referredUsers?.length || 0} referrals
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover-scale relative overflow-hidden group">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Pickaxe className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      Mining Sessions
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {userData.miningSessions?.length || 0}
                  </p>
                  <p className="text-xs text-blue-400">total sessions</p>
                </div>
              </div>

              {/* Referral Info */}
              {userData.referral && (
                <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                    <Gift className="w-5 h-5 text-purple-400" />
                    Referral Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Referral Earnings</p>
                      <p className="text-lg font-semibold text-white">
                        {userData.referral.referralEarnings?.toFixed(2) || 0} tokens
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Referred By</p>
                      <p className="text-lg font-semibold text-white">
                        {userData.referral.referredBy
                          ? formatAddress(userData.referral.referredBy)
                          : "None"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Has Used Referral</p>
                      <p className="text-lg font-semibold text-white">
                        {userData.referral.hasUsedReferral ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Referred Users</p>
                      <p className="text-lg font-semibold text-white">
                        {userData.referral.referredUsers?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mining Sessions */}
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                  <Pickaxe className="w-5 h-5 text-blue-400" />
                  Mining Sessions
                </h3>
                {userData.miningSessions && userData.miningSessions.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {userData.miningSessions.slice(0, 10).map((session) => (
                      <div
                        key={session._id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">
                            {session.selectedHour}h session
                          </p>
                          <p className="text-xs text-gray-400">
                            {formatDate(session.miningStartTime)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {session.totalEarned?.toFixed(2) || 0} tokens
                          </p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              session.status === "mining"
                                ? "bg-green-500/20 text-green-400 border border-green-500/50"
                                : "bg-gray-700 text-gray-400 border border-gray-600"
                            }`}
                          >
                            {session.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No mining sessions yet
                  </p>
                )}
              </div>

              {/* Ad Rewards */}
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  Ad Rewards
                </h3>
                {userData.adRewards && userData.adRewards.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {userData.adRewards.slice(0, 10).map((reward) => (
                      <div
                        key={reward._id}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">Ad Reward</p>
                          <p className="text-xs text-gray-400">
                            {formatDate(reward.claimedAt)}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-green-400">
                          +{reward.rewardedTokens} tokens
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No ad rewards yet
                  </p>
                )}
              </div>

              {/* Referral Mining Rewards */}
              {userData.referralMiningRewards &&
                userData.referralMiningRewards.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl border border-gray-600/50 rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      Referral Mining Rewards (10% Bonus)
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {userData.referralMiningRewards.slice(0, 10).map((reward) => (
                        <div
                          key={reward._id}
                          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">
                              From: {formatAddress(reward.referredWallet)}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatDate(reward.claimedAt)}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-purple-400">
                            +{reward.referrerReward.toFixed(2)} tokens
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Failed to load user details</p>
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl px-8 py-6 flex justify-end border-t border-gray-700/50">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
