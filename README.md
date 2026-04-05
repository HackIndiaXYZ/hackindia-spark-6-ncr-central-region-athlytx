# 🏆 ATHLYX - Verifiable Athlete Health Credentials on Polygon

## 🎯 PROJECT OVERVIEW
**ATHLYX** - A Web3 + AI healthcare platform for 500M+ Indian grassroots athletes

### Problem Statement
- 500M+ grassroots athletes in India lack verifiable health credentials
- No standardized system for injury prevention
- Coaches/scouts cannot verify athlete fitness claims

### Solution
Blockchain-based verifiable health credentials with AI-powered injury risk prediction

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS + shadcn/ui
- Web3Auth (Social login → Wallet)
- ethers.js v6
- Zustand (State management)

### Backend
- FastAPI (Python)
- PostgreSQL
- XGBoost (AI/ML)
- IPFS (Pinata)

### Blockchain
- Polygon Mumbai Testnet
- Solidity 0.8.20
- Hardhat
- OpenZeppelin ERC721

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Git

### 1. Clone Repository
```bash
git clone https://github.com/HackIndiaXYZ/hackindia-spark-6-ncr-central-region-athlytx.git
cd hackindia-spark-6-ncr-central-region-athlytx
```

### 2. Smart Contract Deployment
```bash
cd blockchain
npm install
cp .env.example .env
# Add your PRIVATE_KEY and POLYGONSCAN_API_KEY
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Configure DATABASE_URL, NFT_CONTRACT_ADDRESS, etc.
uvicorn app.main:app --reload
```

### 4. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add VITE_API_URL, VITE_WEB3AUTH_CLIENT_ID
npm run dev
```

## 📋 Features

✅ Web3Auth Social Login (Google → Instant Wallet)
✅ Encrypted Health Records on IPFS
✅ Indian Diet Tracker (Roti, Dal, Rice, etc.)
✅ AI-Powered Injury Risk Prediction
✅ NFT Health Credentials on Polygon
✅ QR Code Verification System
✅ Zero-Knowledge Proofs (Privacy)

## 🏗️ Architecture

```
Frontend (React) → Backend (FastAPI) → Polygon + IPFS + PostgreSQL
                         ↓
                   AI/ML Engine (XGBoost)
```

## 📊 Demo Flow

1. Login with Google (Web3Auth)
2. Upload health record → IPFS
3. Log diet (Indian foods)
4. Calculate risk score (AI)
5. Mint NFT credential
6. Verify via QR code

## 🎯 Hackathon Submission

- **Track**: Polygon Track
- **Problem**: Healthcare + Web3
- **Market**: 500M+ Indian athletes
- **Business Model**: Free for athletes, B2B for sports organizations

## 📝 License

MIT License

## 👥 Team

Built for HackIndia Spark 6.0 - NCR Central Region

---

**Made with ❤️ for Indian Athletes**
