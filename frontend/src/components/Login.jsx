import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';
import { Activity, Wallet } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { setUser, setWalletAddress } = useStore();
  const navigate = useNavigate();

  const handleWeb3Login = async () => {
    setLoading(true);
    try {
      // Simulate Web3Auth login (in production, use actual Web3Auth)
      const mockWallet = `0x${Math.random().toString(16).substr(2, 40)}`;
      const mockEmail = 'athlete@athlyx.com';
      const mockName = 'Demo Athlete';
      
      const response = await loginUser(mockWallet, mockEmail, mockName);
      
      setUser(response.data);
      setWalletAddress(mockWallet);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-16 w-16 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ATHLYX</h1>
          <p className="text-gray-600">Verifiable Athlete Health Credentials</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleWeb3Login}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
          >
            <Wallet className="h-5 w-5" />
            <span className="font-semibold">
              {loading ? 'Connecting...' : 'Login with Web3Auth'}
            </span>
          </button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Powered by Polygon • IPFS • AI</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-2">Features:</h3>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>✅ Encrypted Health Records on IPFS</li>
            <li>✅ AI-Powered Injury Risk Prediction</li>
            <li>✅ NFT Health Credentials on Polygon</li>
            <li>✅ Indian Diet Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
