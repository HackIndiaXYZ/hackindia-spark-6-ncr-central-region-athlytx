from pydantic import BaseModel
from functools import lru_cache
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./athlyx.db")
    POLYGON_MUMBAI_RPC: str = os.getenv("POLYGON_MUMBAI_RPC", "https://rpc-mumbai.maticvigil.com")
    NFT_CONTRACT_ADDRESS: str = os.getenv("NFT_CONTRACT_ADDRESS", "")
    ADMIN_PRIVATE_KEY: str = os.getenv("ADMIN_PRIVATE_KEY", "")
    PINATA_API_KEY: str = os.getenv("PINATA_API_KEY", "")
    PINATA_SECRET_API_KEY: str = os.getenv("PINATA_SECRET_API_KEY", "")
    WEB3AUTH_CLIENT_ID: str = os.getenv("WEB3AUTH_CLIENT_ID", "")

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
