import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { getAthleteCredentials, mintNFT } from '../services/api';
import toast from 'react-hot-toast';

export default function Credentials() {
  const { user } = useStore();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);

  useEffect(() => {
    if (user && user.athlete_id) {
      fetchCredentials();
    }
  }, [user]);

  const fetchCredentials = async () => {
    setLoading(true);
    try {
      const response = await getAthleteCredentials(user.athlete_id);
      setCredentials(response.data.credentials || []);
    } catch (error) {
      toast.error('Failed to fetch NFT credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleMintTestNFT = async () => {
    setMinting(true);
    try {
      const response = await mintNFT({
        user_id: user.id,
        credential_type: "HEALTH_CLEARED",
        ipfs_metadata: "QmBaseHashPlaceholder" // Mock for testing
      });
      
      if (response.data.success) {
        toast.success('NFT Credential successfully minting on Polygon Mumbai!');
        fetchCredentials();
      } else {
        toast.error(response.data.message || 'Minting failed');
      }
    } catch (error) {
      toast.error('Error minting NFT');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Polygon Credentials (NFTs)</h1>
        <button
          onClick={handleMintTestNFT}
          disabled={minting || !user}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
        >
          {minting ? 'Minting...' : 'Mint Test Credential'}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading your blockchain credentials...</p>
      ) : credentials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-800">Token ID: #{cred.token_id}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${cred.is_valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {cred.is_valid ? 'Valid' : 'Expired/Revoked'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Type:</strong> {cred.type === 0 ? 'Health Cleared' : cred.type === 1 ? 'Milestone' : 'Other'}</p>
                <p><strong>Issued At:</strong> {new Date(cred.issued_at * 1000).toLocaleDateString()}</p>
                <p><strong>Expiry:</strong> {new Date(cred.expiry_date * 1000).toLocaleDateString()}</p>
              </div>

              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500 truncate">
                  IPFS Hash: <a href={`https://gateway.pinata.cloud/ipfs/${cred.ipfs_hash}`} className="text-blue-500 hover:underline">{cred.ipfs_hash}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
          <p>You don't have any verifiable credentials associated with your ID yet.</p>
        </div>
      )}
    </div>
  );
}
