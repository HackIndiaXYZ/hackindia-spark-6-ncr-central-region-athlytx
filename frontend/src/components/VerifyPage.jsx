import React, { useState } from 'react';
import { getAthleteCredentials } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

export default function VerifyPage() {
  const [athleteId, setAthleteId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!athleteId) return;

    setLoading(true);
    try {
      const response = await getAthleteCredentials(athleteId);
      setVerificationResult(response.data);
      toast.success('Fetch completed');
    } catch (error) {
      toast.error('Failed to verify. Invalid Athlete ID.');
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Verify Athlete Credentials</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-lg mx-auto">
        <form onSubmit={handleVerify} className="flex space-x-2">
          <input
            type="text"
            className="flex-grow px-4 py-2 border rounded-md"
            placeholder="Enter Athlete ID (e.g. ATH1234...)"
            value={athleteId}
            onChange={(e) => setAthleteId(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Verify'}
          </button>
        </form>
      </div>

      {verificationResult && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Athlete Profile</h2>
              <p className="text-gray-500">ID: {verificationResult.athlete_id}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white p-2 border rounded-md">
              <QRCodeSVG value={`https://athlyx.com/verify?id=${verificationResult.athlete_id}`} size={100} />
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4 border-b pb-2">On-Chain Credentials</h3>
          
          {verificationResult.credentials && verificationResult.credentials.length > 0 ? (
            <div className="space-y-4">
              {verificationResult.credentials.map((cred, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-semibold">{cred.type === 0 ? 'Health Cleared' : 'Fitness Milestone'}</span>
                    <p className="text-xs text-gray-500">Issued On: {new Date(cred.issued_at * 1000).toLocaleDateString()}</p>
                  </div>
                  {cred.is_valid ? (
                    <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded-full border border-green-300">✓ VERIFIED</span>
                  ) : (
                    <span className="text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full border border-red-300">✗ INVALID</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No blockchain records found for this athlete.</p>
          )}
        </div>
      )}
    </div>
  );
}
