from web3 import Web3
import os
import json
from dotenv import load_dotenv

load_dotenv()

# Polygon Mumbai configuration
POLYGON_RPC = os.getenv("POLYGON_MUMBAI_RPC", "https://rpc-mumbai.maticvigil.com")
CONTRACT_ADDRESS = os.getenv("NFT_CONTRACT_ADDRESS")
PRIVATE_KEY = os.getenv("ADMIN_PRIVATE_KEY")

# Load contract ABI
with open("app/contracts/AthleteCredentialNFT.json", "r") as f:
    contract_abi = json.load(f)["abi"]

# Initialize Web3
if POLYGON_RPC:
    w3 = Web3(Web3.HTTPProvider(POLYGON_RPC))
    if CONTRACT_ADDRESS:
        contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)

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
    admin_account = w3.eth.account.from_key(PRIVATE_KEY)
    
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
    
    # Extract token ID from event logs
    token_id = contract.events.CredentialMinted().process_receipt(receipt)[0]['args']['tokenId']
    
    return token_id, tx_hash.hex()

def get_athlete_nfts(athlete_id: str) -> list:
    """
    Get all NFT credentials for an athlete
    """
    token_ids = contract.functions.getAthleteCredentials(athlete_id).call()
    
    credentials = []
    for token_id in token_ids:
        cred = contract.functions.getCredential(token_id).call()
        is_valid = contract.functions.isCredentialValid(token_id).call()
        
        credentials.append({
            "token_id": token_id,
            "type": cred[0],
            "issued_at": cred[1],
            "ipfs_hash": cred[2],
            "expiry_date": cred[3],
            "is_valid": is_valid
        })
    
    return credentials
