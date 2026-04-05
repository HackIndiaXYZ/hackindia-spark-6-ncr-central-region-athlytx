# 📚 ATHLYX API Documentation

Base URL: `http://localhost:8000/api`

## Authentication

All authenticated endpoints require a valid wallet address.

## Endpoints

### 1. Authentication

#### POST /auth/login
Login or register user with Web3Auth

**Request Body:**
```json
{
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "email": "athlete@example.com",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "id": 1,
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "email": "athlete@example.com",
  "name": "John Doe",
  "athlete_id": "ATH12345",
  "sport": null,
  "is_verified": false
}
```

#### GET /auth/me
Get current user details

**Query Parameters:**
- `wallet_address` (required): User's wallet address

**Response:**
```json
{
  "id": 1,
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "email": "athlete@example.com",
  "name": "John Doe",
  "athlete_id": "ATH12345",
  "sport": "Cricket",
  "is_verified": true
}
```

### 2. Health Records

#### POST /health/upload
Upload encrypted health record to IPFS

**Request (multipart/form-data):**
- `user_id` (required): User ID
- `record_type` (required): "medical_report" | "fitness_test" | "injury_report"
- `description` (optional): Record description
- `file` (required): File to upload

**Response:**
```json
{
  "id": 1,
  "record_type": "medical_report",
  "ipfs_hash": "QmXxxx...",
  "description": "Annual health checkup",
  "uploaded_at": "2024-01-15T10:30:00Z"
}
```

#### GET /health/records/{user_id}
Get all health records for a user

**Response:**
```json
[
  {
    "id": 1,
    "record_type": "medical_report",
    "ipfs_hash": "QmXxxx...",
    "description": "Annual health checkup",
    "uploaded_at": "2024-01-15T10:30:00Z"
  }
]
```

### 3. Diet Tracking

#### POST /diet/log
Log a meal

**Request Body:**
```json
{
  "user_id": 1,
  "meal_type": "breakfast",
  "food_item": "roti",
  "quantity_grams": 200
}
```

**Response:**
```json
{
  "id": 1,
  "date": "2024-01-15",
  "meal_type": "breakfast",
  "food_item": "roti",
  "quantity_grams": 200,
  "calories": 142,
  "protein_g": 5.4
}
```

#### GET /diet/food-database
Get Indian food database

**Response:**
```json
{
  "roti": {
    "calories": 71,
    "protein": 2.7,
    "carbs": 15,
    "fats": 0.4,
    "fiber": 2.7
  },
  "rice": {
    "calories": 130,
    "protein": 2.7,
    "carbs": 28,
    "fats": 0.3,
    "fiber": 0.4
  }
}
```

#### GET /diet/summary/{user_id}
Get daily diet summary

**Query Parameters:**
- `target_date` (required): Date in YYYY-MM-DD format

**Response:**
```json
{
  "date": "2024-01-15",
  "total_calories": 2450,
  "total_protein": 145.5,
  "total_carbs": 320.2,
  "total_fats": 65.8,
  "meals_logged": 4
}
```

### 4. AI Engine

#### POST /ai/calculate-risk/{user_id}
Calculate injury risk score

**Response:**
```json
{
  "score": 35.5,
  "risk_level": "medium",
  "diet_score": 85.2,
  "recommendations": "⚠️ Increase protein intake (target: 150-180g/day) | ✅ Great job! Keep maintaining your current routine"
}
```

#### GET /ai/risk-history/{user_id}
Get risk score history

**Response:**
```json
[
  {
    "id": 1,
    "score": 35.5,
    "risk_level": "medium",
    "diet_score": 85.2,
    "recommendations": "...",
    "calculated_at": "2024-01-15T10:30:00Z"
  }
]
```

### 5. NFT Credentials

#### POST /nft/mint
Mint NFT credential on Polygon

**Request Body:**
```json
{
  "user_id": 1,
  "credential_type": "HEALTH_CLEARED",
  "ipfs_metadata": "QmXxxx..."
}
```

**Response:**
```json
{
  "success": true,
  "token_id": 1,
  "transaction_hash": "0xabc123...",
  "message": "NFT credential minted successfully"
}
```

#### GET /nft/credentials/{athlete_id}
Get all NFT credentials for an athlete

**Response:**
```json
{
  "athlete_id": "ATH12345",
  "credentials": [
    {
      "token_id": 1,
      "athlete_id": "ATH12345"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "No recent diet data available"
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## CORS

Allowed origins:
- `http://localhost:3000` (development)
- `https://athlyx.com` (production)

## Webhooks (Future)

### NFT Minted
```json
{
  "event": "nft.minted",
  "data": {
    "token_id": 1,
    "athlete_id": "ATH12345",
    "transaction_hash": "0xabc123..."
  }
}
```

### Risk Score Updated
```json
{
  "event": "risk.updated",
  "data": {
    "user_id": 1,
    "score": 35.5,
    "risk_level": "medium"
  }
}
```

## SDK Examples

### JavaScript/TypeScript

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Login
const login = async (walletAddress) => {
  const response = await api.post('/auth/login', {
    wallet_address: walletAddress,
    email: 'athlete@example.com',
    name: 'John Doe'
  });
  return response.data;
};

// Log diet
const logDiet = async (userId, mealType, foodItem, quantity) => {
  const response = await api.post('/diet/log', {
    user_id: userId,
    meal_type: mealType,
    food_item: foodItem,
    quantity_grams: quantity
  });
  return response.data;
};

// Calculate risk
const calculateRisk = async (userId) => {
  const response = await api.post(`/ai/calculate-risk/${userId}`);
  return response.data;
};
```

### Python

```python
import requests

BASE_URL = 'http://localhost:8000/api'

# Login
def login(wallet_address):
    response = requests.post(f'{BASE_URL}/auth/login', json={
        'wallet_address': wallet_address,
        'email': 'athlete@example.com',
        'name': 'John Doe'
    })
    return response.json()

# Log diet
def log_diet(user_id, meal_type, food_item, quantity):
    response = requests.post(f'{BASE_URL}/diet/log', json={
        'user_id': user_id,
        'meal_type': meal_type,
        'food_item': food_item,
        'quantity_grams': quantity
    })
    return response.json()

# Calculate risk
def calculate_risk(user_id):
    response = requests.post(f'{BASE_URL}/ai/calculate-risk/{user_id}')
    return response.json()
```

## Testing

### Health Check
```bash
curl http://localhost:8000/health-check
```

### Login Test
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "email": "test@example.com",
    "name": "Test User"
  }'
```

### Log Diet Test
```bash
curl -X POST http://localhost:8000/api/diet/log \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1,
    "meal_type": "breakfast",
    "food_item": "roti",
    "quantity_grams": 200
  }'
```

---

**API Version:** 1.0.0
**Last Updated:** 2024
