import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { calculateRiskScore, getRiskHistory } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { TrendingUp, Award, Activity } from 'lucide-react';

export default function Dashboard() {
  const { user, currentRiskScore, setRiskScore } = useStore();
  const [riskHistory, setRiskHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRiskHistory();
    }
  }, [user]);

  const fetchRiskHistory = async () => {
    try {
      const response = await getRiskHistory(user.id);
      setRiskHistory(response.data);
    } catch (error) {
      console.error('Failed to fetch risk history:', error);
    }
  };

  const handleCalculateRisk = async () => {
    setLoading(true);
    try {
      const response = await calculateRiskScore(user.id);
      setRiskScore(response.data);
      toast.success('Risk score calculated!');
      fetchRiskHistory();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to calculate risk score');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome, {user?.name || 'Athlete'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Risk Score Widget */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Current Risk Score</h2>
          </div>
          
          {currentRiskScore ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-bold">{currentRiskScore.score.toFixed(1)}</span>
                <span className={`px-4 py-2 rounded-full font-semibold ${getRiskColor(currentRiskScore.risk_level)}`}>
                  {currentRiskScore.risk_level.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Diet Score</span>
                    <span>{currentRiskScore.diet_score.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${currentRiskScore.diet_score}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-700">{currentRiskScore.recommendations}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No risk score calculated yet</p>
              <button
                onClick={handleCalculateRisk}
                disabled={loading}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
              >
                {loading ? 'Calculating...' : 'Calculate Risk Score'}
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Quick Stats</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Athlete ID</span>
              <span className="font-semibold">{user?.athlete_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sport</span>
              <span className="font-semibold">{user?.sport || 'Not set'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Verified</span>
              <span className={`px-3 py-1 rounded-full text-sm ${user?.is_verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {user?.is_verified ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk History Chart */}
      {riskHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Risk Score History</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskHistory.reverse()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="calculated_at" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
