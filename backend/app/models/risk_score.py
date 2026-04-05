from sqlalchemy import Column, Integer, Float, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class RiskScore(Base):
    __tablename__ = "risk_scores"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Float)  # 0-100 (0=low risk, 100=high risk)
    risk_level = Column(String)  # "low", "medium", "high"
    
    # Contributing factors
    diet_score = Column(Float)
    recovery_score = Column(Float)
    training_load_score = Column(Float)
    
    # AI recommendations
    recommendations = Column(Text)
    
    calculated_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="risk_scores")
