from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class HealthRecord(Base):
    __tablename__ = "health_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    record_type = Column(String)  # "medical_report", "fitness_test", "injury_report"
    ipfs_hash = Column(String, unique=True)  # Encrypted file on IPFS
    encrypted_key = Column(Text)  # Fernet key for decryption
    description = Column(Text)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    # Health metrics (extracted from records)
    height_cm = Column(Float, nullable=True)
    weight_kg = Column(Float, nullable=True)
    bmi = Column(Float, nullable=True)
    blood_pressure = Column(String, nullable=True)
    heart_rate = Column(Integer, nullable=True)
    
    user = relationship("User", back_populates="health_records")
