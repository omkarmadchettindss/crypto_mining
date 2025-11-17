import { useEffect, useState } from "react";
import { Activity, Clock, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Mining = () => {
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 1,
  });

  useEffect(() => {
    fetchData();
  }, [filter, pagination.page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const statusParam = filter !== "all" ? `status=${filter}&` : "";
      const [sessionsRes, statsRes] = await Promise.all([
        axios.get(
          `http://localhost:5000/api/admin/mining?${statusParam}page=${pagination.page}&limit=${pagination.limit}`
        ),
        axios.get("http://localhost:5000/api/admin/mining/stats"),
      ]);
      setSessions(sessionsRes.data.sessions);
      setPagination(sessionsRes.data.pagination);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Error fetching mining data:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (addr) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div>
      {/* Enhanced Header */}
      <div className="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Mining Sessions
        </h1>
        <p className="text-gray-400 mt-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Monitor all mining activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg shadow-lg border border-blue-500/30 hover:border-blue-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Sessions</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{stats.totalSessions}</h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Activity className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg shadow-lg border border-green-500/30 hover:border-green-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Active</p>
              <h3 className="text-2xl font-bold mt-1 text-green-400">
                {stats.activeSessions}
              </h3>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg shadow-lg border border-purple-500/30 hover:border-purple-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Completed</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{stats.completedSessions}</h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-lg shadow-lg border border-yellow-500/30 hover:border-yellow-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Mined</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {stats.totalMined?.toFixed(0)}
              </h3>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-6 mb-6">
        <div className="flex gap-2">
          {["all", "mining", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      Multiplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      Earned
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                      Started
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {sessions.map((session, index) => (
                    <tr 
                      key={session._id} 
                      className="hover:bg-gray-750 transition-all animate-fadeIn"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">
                          {formatAddress(session.wallet)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {session.selectedHour}h
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          {session.multiplier}x
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-white">
                          {session.totalEarned?.toFixed(2) || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            session.status === "mining"
                              ? "bg-green-500/20 text-green-400 border border-green-500/50 animate-pulse-slow"
                              : "bg-gray-700 text-gray-400 border border-gray-600"
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {formatDate(session.miningStartTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {sessions.length > 0 && (
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between border-t border-gray-700">
                <div className="text-sm text-gray-300">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} sessions
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                    }
                    disabled={pagination.page === 1}
                    className="px-3 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-300">
                      Page {pagination.page} of {pagination.pages}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                    disabled={pagination.page === pagination.pages}
                    className="px-3 py-1 border border-gray-600 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Mining;
