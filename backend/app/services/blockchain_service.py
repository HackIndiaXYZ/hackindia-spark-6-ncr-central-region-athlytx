from web3 import Web3
import json
from app.config import settings

# Polygon Mumbai configuration
w3 = Web3(Web3.HTTPProvider(settings.POLYGON_MUMBAI_RPC))

# Contract ABI (simplified for demo)
CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "address", "name": "athleteAddress", "type": "address"},
            {"internalType": "string", "name": "athleteId", "type": "string"},
            {"internalType": "uint8", "name": "credType", "type": "uint8"},
            {"internalType": "string", "name": "ipfsHash", "type": "string"},
            {"internalType": "uint256", "name": "validityDays", "type": "uint256"}
        ],
        "name": "mintCredential",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "string", "name": "athleteId", "type": "string"}],
        "name": "getAthleteCredentials",
        "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
        "stateMutability": "view",
        "type": "function"
    }
]

def get_contract():
    """Get contract instance"""
    if not settings.NFT_CONTRACT_ADDRESS:
        raise Exception("NFT_CONTRACT_ADDRESS not configured")
    return w3.eth.contract(address=settings.NFT_CONTRACT_ADDRESS, abi=CONTRACT_ABI)

def mint_credential_nft(
    athlete_address: str,
    athlete_id: str,
    credential_type: str,
    ipfs_hash: str,
    validity_days: int = 365
) -> tuple[int, str]:
    """
    Mint NFT credential on Polygon
    Returns: (token_id, transaction_hash)
    """
    contract = get_contract()
    
    # Map credential type to enum
    cred_type_map = {
        "HEALTH_CLEARED": 0,
        "FITNESS_MILESTONE": 1,
        "DIET_CONSISTENCY": 2,
        "INJURY_FREE_STREAK": 3,
        "RISK_MANAGEMENT": 4
    }
    
    cred_type_int = cred_type_map.get(credential_type, 0)
    
    # Get admin account
    admin_account = w3.eth.account.from_key(settings.ADMIN_PRIVATE_KEY)
    
    # Build transaction
    nonce = w3.eth.get_transaction_count(admin_account.address)
    
    txn = contract.functions.mintCredential(
        athlete_address,
        athlete_id,
        cred_type_int,
        ipfs_hash,
        validity_days
    ).build_transaction({
        'from': admin_account.address,
        'nonce': nonce,
        'gas': 300000,
        'gasPrice': w3.eth.gas_price
    })
    
    # Sign and send
    signed_txn = admin_account.sign_transaction(txn)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    
    # Wait for receipt
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    
    # Extract token ID from logs (simplified)
    token_id = receipt['logs'][0]['topics'][1] if receipt['logs'] else 1
    
    return int.from_bytes(token_id, 'big') if isinstance(token_id, bytes) else token_id, tx_hash.hex()

def get_athlete_nfts(athlete_id: str) -> list:
    """Get all NFT credentials for an athlete"""
    contract = get_contract()
    token_ids = contract.functions.getAthleteCredentials(athlete_id).call()
    
    credentials = []
    for token_id in token_ids:
        credentials.append({
            "token_id": token_id,
            "athlete_id": athlete_id
        })
    
    return credentials
