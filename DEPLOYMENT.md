# 🚀 ATHLYX Deployment Guide

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Git
- Polygon Mumbai Testnet wallet with MATIC

## 1. Smart Contract Deployment

### Step 1: Setup Blockchain Environment

```bash
cd blockchain
npm install
```

### Step 2: Configure Environment

Create `.env` file:
```bash
PRIVATE_KEY=your_metamask_private_key
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### Step 3: Get Mumbai MATIC

Visit: https://faucet.polygon.technology/
- Connect wallet
- Request test MATIC

### Step 4: Deploy Contract

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

Save the deployed contract address!

## 2. Backend Deployment

### Step 1: Setup Python Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Setup PostgreSQL Database

```bash
# Create database
createdb athlyx

# Or using psql
psql -U postgres
CREATE DATABASE athlyx;
```

### Step 3: Configure Environment

Create `.env` file:
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/athlyx
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=your_deployed_contract_address
ADMIN_PRIVATE_KEY=your_admin_private_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
WEB3AUTH_CLIENT_ID=your_web3auth_client_id
```

### Step 4: Run Migrations

```bash
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"
```

### Step 5: Start Backend Server

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend will be available at: http://localhost:8000

## 3. Frontend Deployment

### Step 1: Setup Frontend

```bash
cd frontend
npm install
```

### Step 2: Configure Environment

Create `.env` file:
```bash
VITE_API_URL=http://localhost:8000/api
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_client_id
VITE_NFT_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_POLYGON_RPC=https://rpc-mumbai.maticvigil.com
```

### Step 3: Start Development Server

```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

### Step 4: Build for Production

```bash
npm run build
```

## 4. Production Deployment

### Backend (Railway/Render)

1. Create new project on Railway/Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy!

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy!

## 5. Web3Auth Setup

1. Visit: https://dashboard.web3auth.io/
2. Create new project
3. Add allowed origins:
   - http://localhost:3000
   - https://your-production-domain.com
4. Copy Client ID to `.env`

## 6. Pinata (IPFS) Setup

1. Visit: https://www.pinata.cloud/
2. Create account
3. Generate API keys
4. Add to backend `.env`

## 7. Testing the Application

### Test Flow:

1. Open frontend: http://localhost:3000
2. Click "Login with Web3Auth"
3. Upload health record → Check IPFS hash
4. Log diet (Roti, Dal, Rice)
5. Calculate risk score → Check AI prediction
6. Mint NFT credential → Check Polygon transaction
7. Verify via QR code

## 8. Troubleshooting

### Backend Issues

```bash
# Check database connection
psql -U postgres -d athlyx

# Check logs
tail -f logs/app.log
```

### Frontend Issues

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check API connection
curl http://localhost:8000/health-check
```

### Smart Contract Issues

```bash
# Check deployment
npx hardhat verify --network mumbai CONTRACT_ADDRESS

# Check balance
npx hardhat run scripts/checkBalance.js --network mumbai
```

## 9. Environment Variables Summary

### Blockchain
- `PRIVATE_KEY`: Deployer wallet private key
- `POLYGON_MUMBAI_RPC`: Mumbai RPC URL
- `POLYGONSCAN_API_KEY`: For contract verification

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `NFT_CONTRACT_ADDRESS`: Deployed contract address
- `ADMIN_PRIVATE_KEY`: Admin wallet for minting
- `PINATA_API_KEY`: IPFS API key
- `PINATA_SECRET_API_KEY`: IPFS secret key
- `WEB3AUTH_CLIENT_ID`: Web3Auth client ID

### Frontend
- `VITE_API_URL`: Backend API URL
- `VITE_WEB3AUTH_CLIENT_ID`: Web3Auth client ID
- `VITE_NFT_CONTRACT_ADDRESS`: Contract address
- `VITE_POLYGON_RPC`: Mumbai RPC URL

## 10. Production Checklist

- [ ] Smart contract deployed and verified
- [ ] Backend API running with HTTPS
- [ ] Frontend deployed with custom domain
- [ ] Database backups configured
- [ ] Environment variables secured
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Monitoring setup (Sentry, etc.)
- [ ] Demo video recorded
- [ ] Documentation complete

---

**Need Help?** Check the main README.md or create an issue on GitHub.
