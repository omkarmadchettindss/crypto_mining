import { useEffect, useState } from "react";
import { DollarSign, Gift, TrendingUp, Send, CheckCircle } from "lucide-react";
import axios from "axios";

const Payments = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paidUsers, setPaidUsers] = useState(() => {
    // Load paid users from localStorage on initial render
    const saved = localStorage.getItem('paidUsers');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    fetchData();
  }, []);

  // Save paid users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('paidUsers', JSON.stringify([...paidUsers]));
  }, [paidUsers]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/admin/payments/stats"),
        axios.get("http://localhost:5000/api/admin/users?limit=100"),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data.users);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      console.error("Error details:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMakePayment = async (user) => {
    setProcessingPayment(user.walletId);
    
    // Simulate payment processing with 2 second delay
    setTimeout(() => {
      setProcessingPayment(null);
      setPaymentDetails({
        amount: user.totalEarned,
        walletId: user.walletId,
      });
      
      // Mark user as paid
      setPaidUsers(prev => new Set([...prev, user.walletId]));
      
      setShowSuccessModal(true);
    }, 2000);
  };

  const formatAddress = (addr) =>
    addr.length <= 10 ? addr : `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Header */}
      <div className="mb-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Payments & Rewards
        </h1>
        <p className="text-gray-400 mt-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
          Manage user payments and track distributions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg shadow-lg border border-green-500/30 hover:border-green-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Rewards</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {stats.totalRewards?.toFixed(0)}
              </h3>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg shadow-lg border border-blue-500/30 hover:border-blue-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Ad Rewards</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {stats.totalAdRewards?.toFixed(0)}
              </h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Gift className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg shadow-lg border border-purple-500/30 hover:border-purple-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Referral Bonus</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {stats.totalReferralBonus?.toFixed(0)}
              </h3>
            </div>
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-lg shadow-lg border border-yellow-500/30 hover:border-yellow-500/50 p-6 hover-scale transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Mining Rewards</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {stats.totalReferralMining?.toFixed(0)}
              </h3>
            </div>
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Payment Table */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold">User Payments</h3>
          <p className="text-sm text-gray-400 mt-1">Process payments for users</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Earned
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Referral Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.map((user, index) => (
                <tr 
                  key={user.walletId} 
                  className="hover:bg-gray-750 transition-all animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                        {user.walletId.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">
                          {formatAddress(user.walletId)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {user.totalEarned.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400">tokens</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {user.referralCode || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {user.referredCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        paidUsers.has(user.walletId)
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          : user.totalEarned > 0
                          ? "bg-green-500/20 text-green-400 border border-green-500/50"
                          : "bg-gray-700 text-gray-400 border border-gray-600"
                      }`}
                    >
                      {paidUsers.has(user.walletId)
                        ? "Paid"
                        : user.totalEarned > 0
                        ? "Payable"
                        : "No Balance"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {paidUsers.has(user.walletId) ? (
                      <div className="flex items-center gap-2 text-blue-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Completed</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMakePayment(user)}
                        disabled={
                          processingPayment === user.walletId ||
                          user.totalEarned <= 0
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          processingPayment === user.walletId
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : user.totalEarned > 0
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {processingPayment === user.walletId ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Make Payment
                          </>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && paymentDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/70 animate-fadeIn">
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-gray-700 animate-fadeInScale">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            </div>
            <div className="p-6 bg-gray-800">
              <div className="text-center space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Amount Paid</p>
                  <p className="text-3xl font-bold text-white">
                    {paymentDetails.amount.toFixed(2)} tokens
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">To User</p>
                  <p className="text-lg font-semibold text-white">
                    {formatAddress(paymentDetails.walletId)}
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      setPaymentDetails(null);
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-medium "
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
