import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import { initWeb3Auth, login } from '../services/web3auth';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUser, setWalletAddress } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initWeb3Auth();
        setIsInitialized(true);
      } catch (error) {
        console.error('Web3Auth initialization error:', error);
        setIsInitialized(true);
      }
    };
    init();
  }, []);

  const handleConnectWallet = async () => {
    if (!isInitialized) {
      toast.error("Please wait, initializing...");
      return;
    }
    
    try {
      const provider = await login();
      if (provider) {
        toast.success("Wallet connected successfully!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error("Connecting wallet failed");
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading ATHLYX...</p>
        </div>
      </div>
    );
  }

  return (
    <Hero
      trustBadge={{ text: "Securing 500M+ Grassroots Athletes" }}
      headline={{ line1: "Verifiable Athlete Health", line2: "Credentials on Polygon" }}
      subtitle="A Web3 + AI healthcare platform empowering athletes with immutable, privacy-first records, automated ZK proofs, and predictive injury risk analysis."
      buttons={{
        primary: {
          text: "Connect Wallet / Enter App",
          onClick: handleConnectWallet
        },
        secondary: {
          text: "View Dashboard",
          onClick: () => navigate('/dashboard')
        }
      }}
    />
  );
}
