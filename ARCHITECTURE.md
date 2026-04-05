# 🏗️ ATHLYX System Architecture

## High-Level Architecture

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

## Component Details

### 1. Frontend Layer (React)

**Technology Stack:**
- React 18 with Vite
- Tailwind CSS for styling
- Zustand for state management
- React Router for navigation
- Recharts for data visualization
- Web3Auth for authentication

**Key Components:**

1. **Login Component**
   - Web3Auth integration
   - Social login (Google, Twitter)
   - Automatic wallet creation

2. **Dashboard**
   - Risk score visualization
   - Health metrics overview
   - Quick stats display

3. **Health Records**
   - File upload interface
   - IPFS integration
   - Encrypted storage

4. **Diet Tracker**
   - Indian food database
   - Macro calculator
   - Daily summary

5. **Credentials**
   - NFT minting interface
   - QR code generation
   - Credential display

6. **Verify Page**
   - Public verification
   - QR code scanning
   - Credential validation

### 2. Backend Layer (FastAPI)

**Technology Stack:**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL database
- Web3.py for blockchain
- Cryptography for encryption
- XGBoost for ML

**API Endpoints:**

#### Authentication
- `POST /api/auth/login` - Web3Auth login
- `GET /api/auth/me` - Get current user

#### Health Records
- `POST /api/health/upload` - Upload encrypted record
- `GET /api/health/records/{user_id}` - Get user records

#### Diet Tracking
- `POST /api/diet/log` - Log meal
- `GET /api/diet/summary/{user_id}` - Daily summary
- `GET /api/diet/food-database` - Get food database

#### AI Engine
- `POST /api/ai/calculate-risk/{user_id}` - Calculate risk score
- `GET /api/ai/risk-history/{user_id}` - Get risk history

#### NFT Credentials
- `POST /api/nft/mint` - Mint NFT credential
- `GET /api/nft/credentials/{athlete_id}` - Get credentials

### 3. Database Schema

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE,
    name VARCHAR,
    age INTEGER,
    gender VARCHAR,
    sport VARCHAR,
    athlete_id VARCHAR UNIQUE,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Health Records Table
CREATE TABLE health_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    record_type VARCHAR,
    ipfs_hash VARCHAR UNIQUE,
    encrypted_key TEXT,
    description TEXT,
    height_cm FLOAT,
    weight_kg FLOAT,
    bmi FLOAT,
    blood_pressure VARCHAR,
    heart_rate INTEGER,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Diet Logs Table
CREATE TABLE diet_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    date DATE DEFAULT CURRENT_DATE,
    meal_type VARCHAR,
    food_item VARCHAR,
    quantity_grams FLOAT,
    calories FLOAT,
    protein_g FLOAT,
    carbs_g FLOAT,
    fats_g FLOAT,
    fiber_g FLOAT,
    logged_at TIMESTAMP DEFAULT NOW()
);

-- Risk Scores Table
CREATE TABLE risk_scores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    score FLOAT,
    risk_level VARCHAR,
    diet_score FLOAT,
    recovery_score FLOAT,
    training_load_score FLOAT,
    recommendations TEXT,
    calculated_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Smart Contract Architecture

**AthleteCredentialNFT.sol**

```solidity
contract AthleteCredentialNFT is ERC721, ERC721URIStorage, Ownable {
    // Credential types enum
    enum CredentialType {
        HEALTH_CLEARED,
        FITNESS_MILESTONE,
        DIET_CONSISTENCY,
        INJURY_FREE_STREAK,
        RISK_MANAGEMENT
    }
    
    // Credential struct
    struct Credential {
        CredentialType credType;
        uint256 issuedAt;
        string ipfsHash;
        uint256 expiryDate;
        bool isActive;
        string athleteId;
    }
    
    // Mappings
    mapping(uint256 => Credential) public credentials;
    mapping(string => uint256[]) public athleteCredentials;
    mapping(string => bool) public verifiedAthletes;
    
    // Functions
    function mintCredential(...) public onlyOwner returns (uint256)
    function revokeCredential(uint256 tokenId) public onlyOwner
    function isCredentialValid(uint256 tokenId) public view returns (bool)
    function getAthleteCredentials(string athleteId) public view returns (uint256[])
}
```

### 5. AI/ML Model

**Injury Risk Prediction Model**

**Input Features:**
- Average daily calories (last 7 days)
- Average protein intake (last 7 days)
- Average carbs intake (last 7 days)
- BMI
- Age
- Training days per week

**Output:**
- Risk score (0-100)
- Risk level (low/medium/high)
- Personalized recommendations

**Algorithm:**
- Rule-based system (MVP)
- XGBoost classifier (production)

**Training Data:**
- Athlete health metrics
- Injury history
- Diet patterns
- Training load

### 6. Security Architecture

**Data Encryption:**
- Health records encrypted with Fernet (symmetric)
- Encryption keys stored in database
- IPFS stores encrypted data only

**Authentication:**
- Web3Auth for social login
- JWT tokens for API access
- Wallet signature verification

**Smart Contract Security:**
- OpenZeppelin contracts
- Ownable pattern for admin functions
- Event logging for transparency

**Privacy:**
- Zero-knowledge proofs (future)
- Selective disclosure
- User-controlled data sharing

### 7. Data Flow

**Health Record Upload:**
1. User selects file in frontend
2. Frontend encrypts file
3. Encrypted file uploaded to IPFS via Pinata
4. IPFS hash + encryption key stored in database
5. User receives confirmation

**Risk Score Calculation:**
1. User requests risk calculation
2. Backend fetches last 7 days diet logs
3. Backend fetches latest health metrics
4. ML model processes features
5. Risk score + recommendations generated
6. Results stored in database
7. Frontend displays visualization

**NFT Minting:**
1. User requests NFT mint
2. Backend prepares metadata
3. Metadata uploaded to IPFS
4. Smart contract mintCredential called
5. Transaction sent to Polygon
6. NFT minted and assigned to user wallet
7. Token ID returned to user

### 8. Scalability Considerations

**Backend:**
- Horizontal scaling with load balancer
- Database connection pooling
- Redis caching for frequent queries
- Async processing for heavy tasks

**Frontend:**
- CDN for static assets
- Code splitting
- Lazy loading
- Service worker for offline support

**Blockchain:**
- Batch minting for multiple credentials
- Layer 2 scaling (Polygon)
- IPFS for off-chain storage

### 9. Monitoring & Logging

**Application Monitoring:**
- Sentry for error tracking
- Prometheus for metrics
- Grafana for visualization

**Blockchain Monitoring:**
- Etherscan API for transaction tracking
- Event listeners for contract events
- Gas price monitoring

**Database Monitoring:**
- Query performance tracking
- Connection pool monitoring
- Backup verification

### 10. Future Enhancements

**Phase 2:**
- Mobile app (React Native)
- Wearable device integration
- Real-time health monitoring
- Coach/trainer dashboard

**Phase 3:**
- Multi-chain support (Ethereum, BSC)
- DAO governance
- Token economics
- Marketplace for credentials

**Phase 4:**
- AI-powered training plans
- Telemedicine integration
- Insurance partnerships
- Global athlete registry

---

**Architecture Version:** 1.0.0
**Last Updated:** 2024
