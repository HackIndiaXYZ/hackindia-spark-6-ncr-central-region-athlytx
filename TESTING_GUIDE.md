# 🧪 ATHLYX Testing Guide

## Test Environment Setup

### Prerequisites
- All services running (Backend, Frontend, Database)
- Polygon Mumbai testnet configured
- Test wallet with MATIC

## 1. Manual Testing Checklist

### Authentication Flow

- [ ] **Test 1.1: New User Registration**
  - Open frontend
  - Click "Login with Web3Auth"
  - Verify wallet address generated
  - Verify athlete ID assigned
  - Check database for new user entry

- [ ] **Test 1.2: Existing User Login**
  - Login with same wallet address
  - Verify user data loaded
  - Check no duplicate entries in database

- [ ] **Test 1.3: Logout**
  - Click logout button
  - Verify redirect to login page
  - Verify state cleared

### Health Records

- [ ] **Test 2.1: Upload Health Record**
  - Navigate to Health Records
  - Select record type: "Medical Report"
  - Add description
  - Upload PDF file (< 5MB)
  - Verify IPFS hash displayed
  - Check database for record entry

- [ ] **Test 2.2: View Health Records**
  - Verify uploaded records displayed
  - Check IPFS hash format
  - Verify upload timestamp

- [ ] **Test 2.3: Multiple File Upload**
  - Upload 3 different records
  - Verify all displayed in list
  - Check unique IPFS hashes

### Diet Tracking

- [ ] **Test 3.1: Log Single Meal**
  - Navigate to Diet Tracker
  - Select meal type: "Breakfast"
  - Select food: "Roti"
  - Set quantity: 200g
  - Verify macro calculation
  - Submit
  - Check database entry

- [ ] **Test 3.2: Daily Summary**
  - Log multiple meals
  - Verify total calories calculated
  - Check protein/carbs/fats totals
  - Verify progress bars update

- [ ] **Test 3.3: Food Database**
  - Verify all Indian foods listed
  - Check macro values accurate
  - Test quantity slider (50-500g)

### AI Risk Calculation

- [ ] **Test 4.1: Calculate Risk Score**
  - Log diet for 7 days
  - Navigate to Dashboard
  - Click "Calculate Risk Score"
  - Verify score displayed (0-100)
  - Check risk level (low/medium/high)
  - Verify recommendations shown

- [ ] **Test 4.2: Risk History**
  - Calculate risk multiple times
  - Verify history chart displays
  - Check data points accurate
  - Verify date formatting

- [ ] **Test 4.3: No Diet Data**
  - New user without diet logs
  - Try to calculate risk
  - Verify error message shown

### NFT Credentials

- [ ] **Test 5.1: Mint NFT**
  - Navigate to Credentials
  - Click "Mint NFT on Polygon"
  - Verify transaction initiated
  - Check transaction hash displayed
  - Verify token ID shown
  - Check PolygonScan for transaction

- [ ] **Test 5.2: QR Code Generation**
  - Verify QR code displayed
  - Check athlete ID shown
  - Test QR code scanning

- [ ] **Test 5.3: Credential Verification**
  - Navigate to Verify page
  - Enter athlete ID
  - Verify credentials displayed
  - Check credential count

## 2. API Testing

### Using cURL

#### Test Authentication
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "email": "test@athlyx.com",
    "name": "Test Athlete"
  }'

# Expected: 200 OK with user object
```

#### Test Diet Logging
```bash
# Log diet
curl -X POST http://localhost:8000/api/diet/log \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "meal_type": "breakfast",
    "food_item": "roti",
    "quantity_grams": 200
  }'

# Expected: 200 OK with diet log object
```

#### Test Risk Calculation
```bash
# Calculate risk
curl -X POST http://localhost:8000/api/ai/calculate-risk/1

# Expected: 200 OK with risk score object
```

### Using Postman

Import this collection:

```json
{
  "info": {
    "name": "ATHLYX API Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth - Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"wallet_address\":\"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\",\"email\":\"test@athlyx.com\",\"name\":\"Test Athlete\"}"
        }
      }
    },
    {
      "name": "Diet - Log Meal",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/diet/log",
        "body": {
          "mode": "raw",
          "raw": "{\"user_id\":1,\"meal_type\":\"breakfast\",\"food_item\":\"roti\",\"quantity_grams\":200}"
        }
      }
    }
  ]
}
```

## 3. Smart Contract Testing

### Using Hardhat

```bash
cd blockchain

# Run tests
npx hardhat test

# Test specific function
npx hardhat test --grep "mintCredential"
```

### Test Cases

```javascript
// test/AthleteCredentialNFT.test.js
describe("AthleteCredentialNFT", function () {
  it("Should mint credential", async function () {
    const [owner, athlete] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory("AthleteCredentialNFT");
    const nft = await NFT.deploy();
    
    await nft.mintCredential(
      athlete.address,
      "ATH12345",
      0, // HEALTH_CLEARED
      "QmTest123",
      365
    );
    
    const credentials = await nft.getAthleteCredentials("ATH12345");
    expect(credentials.length).to.equal(1);
  });
  
  it("Should validate credential", async function () {
    // Test credential validation
  });
  
  it("Should revoke credential", async function () {
    // Test credential revocation
  });
});
```

## 4. Integration Testing

### End-to-End Flow

```javascript
// e2e/athlete-journey.test.js
describe("Athlete Journey", () => {
  it("Complete athlete onboarding flow", async () => {
    // 1. Login
    const user = await login("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
    expect(user.athlete_id).toBeDefined();
    
    // 2. Upload health record
    const record = await uploadHealthRecord(user.id, "medical_report", file);
    expect(record.ipfs_hash).toMatch(/^Qm/);
    
    // 3. Log diet for 7 days
    for (let i = 0; i < 7; i++) {
      await logDiet(user.id, "breakfast", "roti", 200);
      await logDiet(user.id, "lunch", "rice", 300);
      await logDiet(user.id, "dinner", "dal", 150);
    }
    
    // 4. Calculate risk score
    const risk = await calculateRiskScore(user.id);
    expect(risk.score).toBeGreaterThanOrEqual(0);
    expect(risk.score).toBeLessThanOrEqual(100);
    
    // 5. Mint NFT
    const nft = await mintNFT(user.id, "HEALTH_CLEARED", "QmTest");
    expect(nft.success).toBe(true);
    expect(nft.token_id).toBeGreaterThan(0);
    
    // 6. Verify credential
    const credentials = await getAthleteCredentials(user.athlete_id);
    expect(credentials.credentials.length).toBeGreaterThan(0);
  });
});
```

## 5. Performance Testing

### Load Testing with Artillery

```yaml
# artillery-config.yml
config:
  target: "http://localhost:8000"
  phases:
    - duration: 60
      arrivalRate: 10
      name: "Warm up"
    - duration: 120
      arrivalRate: 50
      name: "Sustained load"

scenarios:
  - name: "Login and calculate risk"
    flow:
      - post:
          url: "/api/auth/login"
          json:
            wallet_address: "0x{{ $randomString() }}"
            email: "test@example.com"
            name: "Test User"
      - post:
          url: "/api/ai/calculate-risk/1"
```

Run test:
```bash
artillery run artillery-config.yml
```

## 6. Security Testing

### SQL Injection Test
```bash
# Test SQL injection in diet logging
curl -X POST http://localhost:8000/api/diet/log \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "1 OR 1=1",
    "meal_type": "breakfast",
    "food_item": "roti",
    "quantity_grams": 200
  }'

# Expected: 422 Validation Error
```

### XSS Test
```bash
# Test XSS in description field
curl -X POST http://localhost:8000/api/health/upload \
  -F "user_id=1" \
  -F "record_type=medical_report" \
  -F "description=<script>alert('XSS')</script>" \
  -F "file=@test.pdf"

# Expected: Description sanitized
```

## 7. Database Testing

### Check Data Integrity

```sql
-- Verify user creation
SELECT * FROM users WHERE wallet_address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

-- Check diet logs
SELECT COUNT(*) FROM diet_logs WHERE user_id = 1;

-- Verify risk scores
SELECT * FROM risk_scores WHERE user_id = 1 ORDER BY calculated_at DESC;

-- Check health records
SELECT ipfs_hash, encrypted_key FROM health_records WHERE user_id = 1;
```

## 8. Frontend Testing

### Using React Testing Library

```javascript
// Dashboard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders dashboard with user name', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});

test('calculates risk score on button click', async () => {
  render(<Dashboard />);
  const button = screen.getByText(/Calculate Risk Score/i);
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText(/Risk Score/i)).toBeInTheDocument();
  });
});
```

## 9. Test Data

### Sample Users
```json
[
  {
    "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "email": "athlete1@athlyx.com",
    "name": "Rahul Kumar",
    "sport": "Cricket"
  },
  {
    "wallet_address": "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    "email": "athlete2@athlyx.com",
    "name": "Priya Sharma",
    "sport": "Badminton"
  }
]
```

### Sample Diet Logs
```json
[
  {
    "meal_type": "breakfast",
    "food_item": "roti",
    "quantity_grams": 200
  },
  {
    "meal_type": "breakfast",
    "food_item": "dal",
    "quantity_grams": 150
  },
  {
    "meal_type": "lunch",
    "food_item": "rice",
    "quantity_grams": 300
  },
  {
    "meal_type": "lunch",
    "food_item": "chicken_curry",
    "quantity_grams": 200
  },
  {
    "meal_type": "dinner",
    "food_item": "roti",
    "quantity_grams": 150
  },
  {
    "meal_type": "snack",
    "food_item": "banana",
    "quantity_grams": 120
  }
]
```

## 10. Bug Reporting Template

```markdown
### Bug Report

**Title:** [Brief description]

**Environment:**
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Backend Version: 1.0.0
- Frontend Version: 1.0.0

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Screenshots:**
[If applicable]

**Logs:**
```
[Paste relevant logs]
```

**Additional Context:**
[Any other information]
```

## 11. Test Coverage Goals

- Backend API: > 80%
- Frontend Components: > 70%
- Smart Contracts: 100%
- Integration Tests: All critical paths

## 12. Continuous Testing

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          cd backend && pip install -r requirements.txt
          cd ../frontend && npm install
          cd ../blockchain && npm install
      
      - name: Run backend tests
        run: cd backend && pytest
      
      - name: Run frontend tests
        run: cd frontend && npm test
      
      - name: Run contract tests
        run: cd blockchain && npx hardhat test
```

---

**Happy Testing! 🧪**
