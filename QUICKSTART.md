# ⚡ ATHLYX Quick Start Guide

Get ATHLYX running in 10 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.10+ installed
- PostgreSQL 15+ installed
- Git installed

## Step 1: Clone Repository (1 minute)

```bash
git clone https://github.com/HackIndiaXYZ/hackindia-spark-6-ncr-central-region-athlytx.git
cd hackindia-spark-6-ncr-central-region-athlytx
```

## Step 2: Setup Database (2 minutes)

```bash
# Create database
createdb athlyx

# Or using psql
psql -U postgres
CREATE DATABASE athlyx;
\q
```

## Step 3: Setup Backend (3 minutes)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://postgres:password@localhost:5432/athlyx
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
ADMIN_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
PINATA_API_KEY=your_key
PINATA_SECRET_API_KEY=your_secret
WEB3AUTH_CLIENT_ID=your_client_id" > .env

# Run migrations
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"

# Start backend
uvicorn app.main:app --reload
```

Backend running at: http://localhost:8000

## Step 4: Setup Frontend (2 minutes)

Open new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000/api
VITE_WEB3AUTH_CLIENT_ID=your_client_id
VITE_NFT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
VITE_POLYGON_RPC=https://rpc-mumbai.maticvigil.com" > .env

# Start frontend
npm run dev
```

Frontend running at: http://localhost:3000

## Step 5: Test Application (2 minutes)

1. Open http://localhost:3000
2. Click "Login with Web3Auth"
3. You should see the dashboard!

## Quick Test Flow

### 1. Login
- Click "Login with Web3Auth"
- Mock wallet will be created

### 2. Log Diet
- Navigate to "Diet Tracker"
- Select "Breakfast"
- Choose "Roti"
- Set quantity: 200g
- Click "Log Meal"

### 3. Calculate Risk
- Navigate to "Dashboard"
- Click "Calculate Risk Score"
- View AI prediction

## Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.10+

# Check database connection
psql -U postgres -d athlyx
```

### Frontend won't start
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Database connection error
```bash
# Update DATABASE_URL in backend/.env
DATABASE_URL=postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/athlyx
```

## Next Steps

1. **Deploy Smart Contract** - See DEPLOYMENT.md
2. **Configure Web3Auth** - Get client ID from dashboard.web3auth.io
3. **Setup IPFS** - Get API keys from pinata.cloud
4. **Read Documentation** - Check API_DOCUMENTATION.md

## Development Commands

### Backend
```bash
# Run tests
pytest

# Format code
black app/

# Check types
mypy app/
```

### Frontend
```bash
# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview
```

### Blockchain
```bash
cd blockchain

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Mumbai
npx hardhat run scripts/deploy.js --network mumbai
```

## Environment Variables Reference

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@host:5432/athlyx
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
NFT_CONTRACT_ADDRESS=deployed_contract_address
ADMIN_PRIVATE_KEY=your_private_key
PINATA_API_KEY=your_pinata_key
PINATA_SECRET_API_KEY=your_pinata_secret
WEB3AUTH_CLIENT_ID=your_web3auth_id
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:8000/api
VITE_WEB3AUTH_CLIENT_ID=your_web3auth_id
VITE_NFT_CONTRACT_ADDRESS=deployed_contract_address
VITE_POLYGON_RPC=https://rpc-mumbai.maticvigil.com
```

### Blockchain (.env)
```bash
PRIVATE_KEY=your_deployer_private_key
POLYGON_MUMBAI_RPC=https://rpc-mumbai.maticvigil.com
POLYGONSCAN_API_KEY=your_polygonscan_key
```

## Common Issues

### Issue: "Module not found"
**Solution:** Install dependencies
```bash
npm install  # Frontend
pip install -r requirements.txt  # Backend
```

### Issue: "Database connection failed"
**Solution:** Check PostgreSQL is running
```bash
# Windows
net start postgresql-x64-15

# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Issue: "Port already in use"
**Solution:** Kill process or use different port
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or use different port
uvicorn app.main:app --port 8001
```

## Getting Help

- **Documentation:** Check README.md, DEPLOYMENT.md, API_DOCUMENTATION.md
- **Issues:** Create issue on GitHub
- **Demo:** Watch DEMO_SCRIPT.md

---

**You're all set! Start building! 🚀**
