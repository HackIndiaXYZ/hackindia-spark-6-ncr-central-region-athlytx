import os
import requests
from app.config import settings

def upload_to_ipfs(file_bytes: bytes) -> str:
    """Upload file to IPFS via Pinata"""
    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    
    headers = {
        "pinata_api_key": settings.PINATA_API_KEY,
        "pinata_secret_api_key": settings.PINATA_SECRET_API_KEY
    }
    
    files = {
        "file": ("encrypted_record.bin", file_bytes)
    }
    
    response = requests.post(url, files=files, headers=headers)
    
    if response.status_code == 200:
        ipfs_hash = response.json()["IpfsHash"]
        return ipfs_hash
    else:
        raise Exception(f"IPFS upload failed: {response.text}")

def get_from_ipfs(ipfs_hash: str) -> bytes:
    """Retrieve file from IPFS"""
    url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"IPFS retrieval failed: {response.text}")
