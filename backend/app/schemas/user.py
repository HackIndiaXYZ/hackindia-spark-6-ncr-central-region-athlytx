from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    wallet_address: str
    email: Optional[str] = None
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    sport: Optional[str] = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    athlete_id: str
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
