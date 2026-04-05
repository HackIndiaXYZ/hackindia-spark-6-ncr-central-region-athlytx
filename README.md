# 🏆 ATHLYX - COMPLETE HACKATHON WINNING BLUEPRINT

## 🎯 PROJECT OVERVIEW
**ATHLYX** - Verifiable Athlete Health Credentials on Polygon
A Web3 + AI healthcare platform for 500M+ Indian grassroots athletes

## 📋 TABLE OF CONTENTS
1. [System Architecture](#system-architecture)
2. [Tech Stack Deep Dive](#tech-stack-deep-dive)
3. [Smart Contracts](#smart-contracts)
4. [Backend API](#backend-api)
5. [Frontend Application](#frontend-application)

## 🏗️ SYSTEM ARCHITECTURE
The system uses React for frontend, FastAPI for backend with AI predictions via XGBoost, and stores medical data on IPFS, pinning NFTs on Polygon to track athlete credentials.

## Setup Instructions

### Prerequisites
- Node.js v18+ and npm
- Python 3.8+
- Git

### 1. Clone Repository
```shell
git clone <repository-url>
cd ATHLYX
```

### 2. Smart Contract Deployment
```shell
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### 3. Backend (FastAPI)
```shell
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Frontend (React/Vite)
```shell
cd frontend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your Web3Auth Client ID and other configs

# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

## Recent Fixes
- ✅ Fixed Solidity contract compatibility with OpenZeppelin v5 (removed deprecated Counters library)
- ✅ Converted Hero.tsx to Hero.jsx for JSX-only project compatibility
- ✅ Updated .gitignore to exclude Python cache and database files
- ✅ Frontend builds successfully without errors
- ✅ All changes committed and pushed to repository

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
VITE_NFT_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_POLYGON_RPC=https://rpc-mumbai.maticvigil.com
```

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/athlyx
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=your_deployed_contract_address
ADMIN_PRIVATE_KEY=your_admin_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
WEB3AUTH_CLIENT_ID=your_web3auth_client_id
```

Good luck and Hack On!
