import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auth
export const loginUser = (walletAddress, email, name) => 
  api.post('/auth/login', { wallet_address: walletAddress, email, name });

export const getCurrentUser = (walletAddress) => 
  api.get(`/auth/me?wallet_address=${walletAddress}`);

// Health Records
export const uploadHealthRecord = (formData) => 
  api.post('/health/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

export const getUserHealthRecords = (userId) => 
  api.get(`/health/records/${userId}`);

// Diet
export const logDiet = (dietData) => 
  api.post('/diet/log', dietData);

export const getDietSummary = (userId, date) => 
  api.get(`/diet/summary/${userId}?target_date=${date}`);

export const getFoodDatabase = () => 
  api.get('/diet/food-database');

// AI Engine
export const calculateRiskScore = (userId) => 
  api.post(`/ai/calculate-risk/${userId}`);

export const getRiskHistory = (userId) => 
  api.get(`/ai/risk-history/${userId}`);

// NFT
export const mintNFT = (data) => 
  api.post('/nft/mint', data);

export const getAthleteCredentials = (athleteId) => 
  api.get(`/nft/credentials/${athleteId}`);

export default api;
