import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import { login } from '../services/web3auth';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setUser, setWalletAddress } = useStore();

  const handleConnectWallet = async () => {
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

  return (
    <div className="min-h-screen bg-black">
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
    </div>
  );
}
