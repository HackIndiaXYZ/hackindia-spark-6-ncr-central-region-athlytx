# 🏆 ATHLYX - COMPLETE HACKATHON WINNING BLUEPRINT

## 🎯 PROJECT OVERVIEW
**ATHLYX** - Verifiable Athlete Health Credentials on Polygon
A Web3 + AI healthcare platform for 500M+ Indian grassroots athletes

---

## 📋 TABLE OF CONTENTS
1. [System Architecture](#system-architecture)
2. [Tech Stack Deep Dive](#tech-stack-deep-dive)
3. [Smart Contracts](#smart-contracts)
4. [Backend API](#backend-api)
5. [Frontend Application](#frontend-application)
6. [AI/ML Model](#aiml-model)
7. [Database Schema](#database-schema)
8. [IPFS Integration](#ipfs-integration)
9. [Web3Auth Integration](#web3auth-integration)
10. [ZK Proofs Implementation](#zk-proofs-implementation)
11. [Deployment Guide](#deployment-guide)
12. [Demo Data & Testing](#demo-data--testing)

---

## 🏗️ SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                          │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │Dashboard │ Health   │  Diet    │Credentials│ Verify  │      │
│  │          │ Records  │  Tracker │  (NFTs)   │  Page   │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
│                            ↓                                     │
│                      Web3Auth Login                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND (FastAPI + Python)                     │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐      │
│  │  Auth    │  Health  │   Diet   │  AI/ML   │   NFT    │      │
│  │  API     │  Records │   API    │  Engine  │  Minting │      │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘      │
│                            ↓                                     │
│  ┌──────────────────────────────────────────────────────┐      │
│  │          XGBoost Injury Prediction Model             │      │
│  │    (Diet Data + Health Metrics → Risk Score)         │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
         ↓                    ↓                      ↓
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  POLYGON        │  │     IPFS        │  │   PostgreSQL    │
│  (Mumbai Test)  │  │  (Pinata/NFT)   │  │   Database      │
│                 │  │                 │  │                 │
│ ┌─────────────┐ │  │ ┌─────────────┐ │  │ ┌─────────────┐ │
│ │ Credential  │ │  │ │  Medical    │ │  │ │   Users     │ │
│ │ NFT (ERC721)│ │  │ │  Records    │ │  │ │   Health    │ │
│ │             │ │  │ │  (Encrypted)│ │  │ │   Diet      │ │
│ │ ZK Proofs   │ │  │ │             │ │  │ │   Scores    │ │
│ └─────────────┘ │  │ └─────────────┘ │  │ └─────────────┘ │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 🛠️ TECH STACK DEEP DIVE

### **Frontend**
```json
{
  "framework": "React 18",
  "styling": "Tailwind CSS + shadcn/ui",
  "state_management": "Zustand",
  "web3": "@web3auth/modal",
  "blockchain": "ethers.js v6",
  "charts": "recharts",
  "forms": "react-hook-form + zod",
  "routing": "react-router-dom v6",
  "notifications": "react-hot-toast",
  "icons": "lucide-react",
  "qr_codes": "qrcode.react"
}
```

### **Backend**
```json
{
  "framework": "FastAPI",
  "orm": "SQLAlchemy 2.0",
  "database": "PostgreSQL 15",
  "ml_model": "XGBoost + scikit-learn",
  "ipfs": "pinata-python-sdk",
  "blockchain": "web3.py",
  "encryption": "cryptography (Fernet)",
  "env": "python-dotenv",
  "cors": "fastapi.middleware.cors"
}
```

### **Smart Contracts**
```json
{
  "language": "Solidity 0.8.20",
  "framework": "Hardhat",
  "standards": "OpenZeppelin ERC721, Ownable",
  "network": "Polygon Mumbai Testnet",
  "zk_library": "snarkjs (optional for MVP)"
}
```

---

## 📜 SMART CONTRACTS (See src code)

---

## 🔧 BACKEND API (FastAPI) (See src code)

---

## 🎨 FRONTEND APPLICATION (React) (See src code)

---

## 🚀 DEPLOYMENT GUIDE

### **1. Smart Contract Deployment**

```bash
# Install dependencies
cd blockchain
npm install

# Create .env file
echo "PRIVATE_KEY=your_private_key_here" > .env
echo "POLYGONSCAN_API_KEY=your_polygonscan_api_key" >> .env

# Compile contracts
npx hardhat compile

# Deploy to Mumbai
npx hardhat run scripts/deploy.js --network mumbai

# Note the deployed contract address!
```

### **2. Backend Deployment (Railway/Render)**

```bash
# Install dependencies
cd backend
pip install -r requirements.txt

# Create .env file
cat > .env << EOL
DATABASE_URL=postgresql://user:pass@host:5432/athlyx
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=your_deployed_contract_address
ADMIN_PRIVATE_KEY=your_admin_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
WEB3AUTH_CLIENT_ID=your_web3auth_client_id
EOL

# Run migrations
python -c "from app.database import engine, Base; Base.metadata.create_all(bind=engine)"

# Start server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### **3. Frontend Deployment (Vercel/Netlify)**

```bash
# Install dependencies
cd frontend
npm install

# Create .env file
cat > .env << EOL
VITE_API_URL=https://your-backend-url.com/api
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
VITE_NFT_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_POLYGON_RPC=https://rpc-mumbai.maticvigil.com
EOL

# Build
npm run build

# Deploy to Vercel
vercel --prod
```

---

## 🎯 DEMO SCRIPT FOR JUDGES

### **5-Minute Demo Flow**

**Slide 1-2: Problem + Solution (1 min)**
- Show problem stats
- Introduce ATHLYX solution

**Slide 3: Live Demo (3 min)**
1. **Login with Web3Auth** (Google login → instant wallet)
2. **Upload Health Record** → Show IPFS hash
3. **Log Indian Diet** → Roti, Dal, Rice (show macros)
4. **Calculate Risk Score** → Show 🟢 Low Risk
5. **Mint NFT Credential** → Show Polygon transaction
6. **QR Code Verification** → Scan and verify

**Slide 4-5: Tech + Business Model (1 min)**
- Highlight Polygon, ZK proofs, AI
- Emphasize free for athletes

---

## 📊 TESTING DATA

### **Sample User**
```json
{
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "email": "test@athlyx.com",
  "name": "Rahul Kumar",
  "age": 24,
  "sport": "Cricket"
}
```

### **Sample Diet Log**
```json
{
  "meal_type": "breakfast",
  "items": [
    {"food": "roti", "quantity": 200},
    {"food": "dal", "quantity": 150},
    {"food": "egg", "quantity": 100}
  ]
}
```

---

## 🏆 HACKATHON WINNING TIPS

1. **Demo Video** - Record 2-3 minute walkthrough
2. **Live Demo** - Practice 10 times before presenting
3. **Polygon Integration** - Emphasize on-chain credentials
4. **Indian Market Focus** - 500M athletes problem
5. **Clean UI** - Use Tailwind + smooth animations
6. **Working Prototype** - MUST deploy live version
7. **GitHub** - Clean README + Architecture diagram
8. **Pitch Deck** - Focus on problem → solution → market

---

## 🔗 RESOURCES

- **Polygon Mumbai Faucet**: https://faucet.polygon.technology/
- **Web3Auth Dashboard**: https://dashboard.web3auth.io/
- **Pinata (IPFS)**: https://www.pinata.cloud/
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Hardhat Docs**: https://hardhat.org/

---

## ✅ PRE-SUBMISSION CHECKLIST

- [ ] Smart contract deployed on Polygon Mumbai
- [ ] Backend API live (test all endpoints)
- [ ] Frontend deployed (responsive + mobile-friendly)
- [ ] Web3Auth login working
- [ ] IPFS upload working
- [ ] NFT minting working
- [ ] Risk score calculation working
- [ ] Demo video recorded
- [ ] GitHub repository public
- [ ] README with setup instructions
- [ ] Architecture diagram included
- [ ] Test accounts created

---

**GOOD LUCK! 🚀 TUM JEET JAOGE! 💪**
