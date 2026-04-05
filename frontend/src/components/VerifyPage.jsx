import { useState } from 'react';
import { getAthleteCredentials } from '../services/api';
import { Shield, Search } from 'lucide-react';

export default function VerifyPage() {
  const [athleteId, setAthleteId] = useState('');
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getAthleteCredentials(athleteId);
      setCredentials(response.data);
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Athlete</h1>
          <p className="text-gray-600">Enter Athlete ID to verify credentials</p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Athlete ID</label>
            <input
              type="text"
              value={athleteId}
              onChange={(e) => setAthleteId(e.target.value)}
              placeholder="ATH12345"
              className="w-full px-4 py-3 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            <Search className="h-5 w-5" />
            <span>{loading ? 'Verifying...' : 'Verify'}</span>
          </button>
        </form>

        {credentials && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">✅ Verified</h3>
            <p className="text-sm text-green-700">
              Found {credentials.credentials.length} credential(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
