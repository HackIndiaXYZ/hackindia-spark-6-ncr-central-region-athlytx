import { create } from 'zustand';

export const useStore = create((set) => ({
  // Auth state
  user: null,
  walletAddress: null,
  isAuthenticated: false,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  logout: () => set({ user: null, walletAddress: null, isAuthenticated: false }),
  
  // Health data
  healthRecords: [],
  setHealthRecords: (records) => set({ healthRecords: records }),
  
  // Diet data
  dietLogs: [],
  setDietLogs: (logs) => set({ dietLogs: logs }),
  
  // Risk score
  currentRiskScore: null,
  setRiskScore: (score) => set({ currentRiskScore: score }),
  
  // NFT credentials
  credentials: [],
  setCredentials: (creds) => set({ credentials: creds })
}));
