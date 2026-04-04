from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from pydantic import BaseModel

router = APIRouter()

class Web3AuthRequest(BaseModel):
    wallet_address: str
    email: str | None = None
    name: str | None = None

@router.post("/login", response_model=UserResponse)
def web3_login(auth_data: Web3AuthRequest, db: Session = Depends(get_db)):
    """
    Web3Auth login - create or retrieve user by wallet address
    """
    user = db.query(User).filter(User.wallet_address == auth_data.wallet_address).first()
    
    if not user:
        # Create new user
        athlete_id = f"ATH{len(auth_data.wallet_address[:8])}{hash(auth_data.wallet_address) % 10000:04d}"
        user = User(
            wallet_address=auth_data.wallet_address,
            email=auth_data.email,
            name=auth_data.name,
            athlete_id=athlete_id
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    
    return user

@router.get("/me", response_model=UserResponse)
def get_current_user(wallet_address: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.wallet_address == wallet_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
