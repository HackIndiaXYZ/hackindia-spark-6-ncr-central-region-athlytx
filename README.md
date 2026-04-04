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

### 1. Smart Contract Deployment
```shell
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### 2. Backend (FastAPI)
```shell
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 3. Frontend (React/Vite)
```shell
cd frontend
npm install
npm run dev
```

Good luck and Hack On!
