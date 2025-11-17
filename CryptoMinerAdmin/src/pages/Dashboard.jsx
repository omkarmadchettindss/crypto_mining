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

const StatCard = ({ title, value, icon: Icon, color, subtitle, delay = 0 }) => (
  <div 
    className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 hover:border-gray-600 hover-scale animate-fadeIn transition-all"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-white">{value}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-full ${color} transition-transform hover:scale-110`}>
        <Icon className="w-6 h-6 text-white" />
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Overview of your CryptoMiner platform</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Stats'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon={Users}
          color="bg-blue-500"
          subtitle={`+${stats.recentUsers} this week`}
          delay={0}
        />
        <StatCard
          title="Total Tokens"
          value={stats.totalTokens.toLocaleString()}
          icon={Coins}
          color="bg-yellow-500"
          subtitle="Distributed"
          delay={100}
        />
        <StatCard
          title="Active Mining"
          value={stats.activeMining}
          icon={Activity}
          color="bg-green-500"
          subtitle="Sessions"
          delay={200}
        />
        <StatCard
          title="Completed"
          value={stats.completedMining}
          icon={TrendingUp}
          color="bg-purple-500"
          subtitle="Mining sessions"
          delay={300}
        />
      </div>

      {/* Daily Active Users Chart */}
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6 animate-fadeIn" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Daily Active Users</h3>
            <p className="text-sm text-gray-400 mt-1">Mining activity over the last 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
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
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 animate-fadeIn" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Stats</h3>
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

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 animate-fadeIn" style={{ animationDelay: '600ms' }}>
          <h3 className="text-lg font-semibold mb-4 text-white">Platform Health</h3>
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
