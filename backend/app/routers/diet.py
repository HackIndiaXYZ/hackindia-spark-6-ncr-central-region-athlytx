from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.diet_log import DietLog
from pydantic import BaseModel
from datetime import date

router = APIRouter()

# Indian Food Database
INDIAN_FOOD_DB = {
    "roti": {"calories": 71, "protein": 2.7, "carbs": 15, "fats": 0.4, "fiber": 2.7},
    "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fats": 0.3, "fiber": 0.4},
    "dal": {"calories": 104, "protein": 7.6, "carbs": 17, "fats": 0.8, "fiber": 7.9},
    "chicken_curry": {"calories": 165, "protein": 18, "carbs": 5, "fats": 8, "fiber": 1},
    "paneer": {"calories": 265, "protein": 18, "carbs": 1.2, "fats": 20, "fiber": 0},
    "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fats": 0.3, "fiber": 2.6},
    "egg": {"calories": 155, "protein": 13, "carbs": 1.1, "fats": 11, "fiber": 0},
    "curd": {"calories": 98, "protein": 11, "carbs": 4.7, "fats": 4.3, "fiber": 0}
}

class DietLogCreate(BaseModel):
    user_id: int
    meal_type: str
    food_item: str
    quantity_grams: float

class DietLogResponse(BaseModel):
    id: int
    date: date
    meal_type: str
    food_item: str
    quantity_grams: float
    calories: float
    protein_g: float
    
    class Config:
        from_attributes = True

@router.post("/log", response_model=DietLogResponse)
def log_diet(diet_data: DietLogCreate, db: Session = Depends(get_db)):
    """Log diet entry with Indian food database"""
    food_item = diet_data.food_item.lower()
    
    if food_item not in INDIAN_FOOD_DB:
        raise HTTPException(status_code=404, detail=f"Food item '{food_item}' not in database")
    
    # Calculate macros
    food_info = INDIAN_FOOD_DB[food_item]
    multiplier = diet_data.quantity_grams / 100
    
    diet_log = DietLog(
        user_id=diet_data.user_id,
        meal_type=diet_data.meal_type,
        food_item=food_item,
        quantity_grams=diet_data.quantity_grams,
        calories=food_info["calories"] * multiplier,
        protein_g=food_info["protein"] * multiplier,
        carbs_g=food_info["carbs"] * multiplier,
        fats_g=food_info["fats"] * multiplier,
        fiber_g=food_info["fiber"] * multiplier
    )
    
    db.add(diet_log)
    db.commit()
    db.refresh(diet_log)
    
    return diet_log

@router.get("/food-database")
def get_food_database():
    """Get Indian food database"""
    return INDIAN_FOOD_DB

@router.get("/summary/{user_id}")
def get_diet_summary(user_id: int, target_date: date, db: Session = Depends(get_db)):
    """Get daily diet summary"""
    logs = db.query(DietLog).filter(
        DietLog.user_id == user_id,
        DietLog.date == target_date
    ).all()
    
    total_calories = sum(log.calories for log in logs)
    total_protein = sum(log.protein_g for log in logs)
    total_carbs = sum(log.carbs_g for log in logs)
    total_fats = sum(log.fats_g for log in logs)
    
    return {
        "date": target_date,
        "total_calories": total_calories,
        "total_protein": total_protein,
        "total_carbs": total_carbs,
        "total_fats": total_fats,
        "meals_logged": len(logs)
    }
