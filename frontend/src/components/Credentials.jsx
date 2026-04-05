import { useState } from 'react';
import { useStore } from '../store/useStore';
import { mintNFT } from '../services/api';
import toast from 'react-hot-toast';
import { Award, Sparkles } from 'lucide-react';
import QRCode from 'qrcode.react';

export default function Credentials() {
  const { user } = useStore();
  const [minting, setMinting] = useState(false);
  const [mintedNFT, setMintedNFT] = useState(null);

  const handleMintNFT = async () => {
    setMinting(true);
    try {
      const response = await mintNFT({
        user_id: user.id,
        credential_type: 'HEALTH_CLEARED',
        ipfs_metadata: 'QmTest123...'
      });
      
      if (response.data.success) {
        toast.success('NFT Credential minted successfully!');
        setMintedNFT(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to mint NFT');
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">NFT Credentials</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mint NFT */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>Mint Credential</span>
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-md">
              <h3 className="font-semibold text-purple-800 mb-2">Health Cleared Credential</h3>
              <p className="text-sm text-purple-700">
                Mint an NFT credential to verify your health status on the blockchain.
              </p>
            </div>

            <button
              onClick={handleMintNFT}
              disabled={minting}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {minting ? 'Minting...' : 'Mint NFT on Polygon'}
            </button>

            {mintedNFT && (
              <div className="p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-800">
                  ✅ Token ID: {mintedNFT.token_id}
                </p>
                <p className="text-xs text-green-600 break-all">
                  TX: {mintedNFT.transaction_hash}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Award className="h-5 w-5 text-purple-600" />
            <span>Verification QR</span>
          </h2>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white border-4 border-purple-200 rounded-lg">
              <QRCode
                value={`https://athlyx.com/verify/${user?.athlete_id}`}
                size={200}
                level="H"
              />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">Athlete ID</p>
              <p className="font-mono font-semibold">{user?.athlete_id}</p>
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Scan this QR code to verify credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
