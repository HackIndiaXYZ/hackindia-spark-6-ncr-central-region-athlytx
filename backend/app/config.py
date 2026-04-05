from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/athlyx"
    POLYGON_MUMBAI_RPC: str = "https://rpc-mumbai.maticvigil.com"
    NFT_CONTRACT_ADDRESS: str = ""
    ADMIN_PRIVATE_KEY: str = ""
    PINATA_API_KEY: str = ""
    PINATA_SECRET_API_KEY: str = ""
    WEB3AUTH_CLIENT_ID: str = ""
    
    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()

settings = get_settings()
