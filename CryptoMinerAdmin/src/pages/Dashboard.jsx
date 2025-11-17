import { useEffect, useState } from "react";
import { Users, Coins, Activity, TrendingUp, RefreshCw } from "lucide-react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({ title, value, icon: Icon, color, subtitle, delay = 0, gradient, iconBg }) => (
  <div
    className={`${gradient} rounded-2xl shadow-2xl border ${color} p-6 hover:shadow-xl hover-scale animate-fadeIn transition-all backdrop-blur-sm relative overflow-hidden group`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Animated background effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <div className="relative flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-bold mt-3 text-white">{value}</h3>
        {subtitle && <p className="text-sm text-gray-400 mt-2 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {subtitle}
        </p>}
      </div>
      <div className={`p-4 rounded-2xl ${iconBg} transition-all group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTokens: 0,
    activeMining: 0,
    completedMining: 0,
    totalReferrals: 0,
    recentUsers: 0,
    dailyActiveUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      console.log("Fetching stats from:", "http://localhost:5000/api/admin/stats");
      const response = await axios.get("http://localhost:5000/api/admin/stats");
      console.log("Stats response received:", response.data);
      setStats(response.data);
      console.log("Stats state updated");
    } catch (error) {
      console.error("Error fetching stats:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchStats(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  console.log("Rendering Dashboard with stats:", stats);

  return (
    <div>
      {/* Enhanced Header with Glassmorphism */}
      <div className="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Overview of your CryptoMiner platform
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 font-medium"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh Stats'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="border-blue-500/30 hover:border-blue-500/50"
          gradient="bg-gradient-to-br from-blue-500/10 to-blue-600/5"
          iconBg="bg-blue-500/20"
          subtitle={`+${stats.recentUsers} this week`}
          delay={0}
        />
        <StatCard
          title="Total Tokens"
          value={stats.totalTokens.toLocaleString()}
          icon={Coins}
          color="border-yellow-500/30 hover:border-yellow-500/50"
          gradient="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5"
          iconBg="bg-yellow-500/20"
          subtitle="Distributed"
          delay={100}
        />
        <StatCard
          title="Active Mining"
          value={stats.activeMining}
          icon={Activity}
          color="border-green-500/30 hover:border-green-500/50"
          gradient="bg-gradient-to-br from-green-500/10 to-green-600/5"
          iconBg="bg-green-500/20"
          subtitle="Sessions"
          delay={200}
        />
        <StatCard
          title="Completed"
          value={stats.completedMining}
          icon={TrendingUp}
          color="border-purple-500/30 hover:border-purple-500/50"
          gradient="bg-gradient-to-br from-purple-500/10 to-purple-600/5"
          iconBg="bg-purple-500/20"
          subtitle="Mining sessions"
          delay={300}
        />
      </div>

      {/* Daily Active Users Chart */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 hover:border-gray-600/50 p-8 mb-6 animate-fadeIn transition-all" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              Daily Active Users
            </h3>
            <p className="text-sm text-gray-400 mt-2 ml-14">Mining activity over the last 7 days</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 rounded-xl border border-gray-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Last 7 Days</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={stats.dailyActiveUsers}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="day"
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#9CA3AF"
              style={{ fontSize: "12px" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)",
              }}
              labelStyle={{ color: "#F9FAFB", fontWeight: "600" }}
              itemStyle={{ color: "#60A5FA" }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 hover:border-gray-600/50 p-6 animate-fadeIn hover-scale transition-all" style={{ animationDelay: '500ms' }}>
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Referrals</span>
              <span className="font-semibold text-white">{stats.totalReferrals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Avg Tokens/User</span>
              <span className="font-semibold text-white">
                {stats.totalUsers > 0
                  ? (stats.totalTokens / stats.totalUsers).toFixed(2)
                  : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Mining Success Rate</span>
              <span className="font-semibold text-white">
                {stats.completedMining + stats.activeMining > 0
                  ? (
                    (stats.completedMining /
                      (stats.completedMining + stats.activeMining)) *
                    100
                  ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 hover:border-gray-600/50 p-6 animate-fadeIn hover-scale transition-all" style={{ animationDelay: '600ms' }}>
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
            Platform Health
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Active Users</span>
                <span className="text-sm font-medium text-white">
                  {((stats.activeMining / stats.totalUsers) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full shadow-lg shadow-green-500/50"
                  style={{
                    width: `${(stats.activeMining / stats.totalUsers) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-400">Referral Rate</span>
                <span className="text-sm font-medium text-white">
                  {((stats.totalReferrals / stats.totalUsers) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full shadow-lg shadow-blue-500/50"
                  style={{
                    width: `${(stats.totalReferrals / stats.totalUsers) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
