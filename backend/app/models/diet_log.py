from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Date
from sqlalchemy.orm import relationship
from datetime import datetime, date
from app.database import Base

class DietLog(Base):
    __tablename__ = "diet_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(Date, default=date.today)
    meal_type = Column(String)  # "breakfast", "lunch", "dinner", "snack"
    
    # Indian food items
    food_item = Column(String)
    quantity_grams = Column(Float)
    
    # Macros
    calories = Column(Float)
    protein_g = Column(Float)
    carbs_g = Column(Float)
    fats_g = Column(Float)
    fiber_g = Column(Float)
    
    logged_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="diet_logs")
