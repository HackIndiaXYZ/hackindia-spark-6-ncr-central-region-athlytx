from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.risk_score import RiskScore
from app.models.diet_log import DietLog
from app.models.health_record import HealthRecord
from app.services.ml_service import predict_injury_risk
from pydantic import BaseModel
from datetime import datetime, timedelta

router = APIRouter()

class RiskScoreResponse(BaseModel):
    score: float
    risk_level: str
    diet_score: float
    recommendations: str

    class Config:
        from_attributes = True

@router.post("/calculate-risk/{user_id}", response_model=RiskScoreResponse)
def calculate_risk_score(user_id: int, db: Session = Depends(get_db)):
    """
    Calculate injury risk score using AI/ML model
    """
    # Get last 7 days of diet logs
    seven_days_ago = datetime.now() - timedelta(days=7)
    diet_logs = db.query(DietLog).filter(
        DietLog.user_id == user_id,
        DietLog.logged_at >= seven_days_ago
    ).all()
    
    # Get latest health record
    health_record = db.query(HealthRecord).filter(
        HealthRecord.user_id == user_id
    ).order_by(HealthRecord.uploaded_at.desc()).first()
    
    if not diet_logs:
        raise HTTPException(status_code=400, detail="No recent diet data available")
    
    # Prepare features for ML model
    avg_calories = sum(log.calories for log in diet_logs) / len(diet_logs)
    avg_protein = sum(log.protein_g for log in diet_logs) / len(diet_logs)
    avg_carbs = sum(log.carbs_g for log in diet_logs) / len(diet_logs)
    
    features = {
        "avg_calories": avg_calories,
        "avg_protein": avg_protein,
        "avg_carbs": avg_carbs,
        "bmi": health_record.bmi if health_record else 22.0,
        "age": 25,  # Default - should come from user profile
        "training_days": 5  # Default - should come from tracking
    }
    
    # Predict risk
    risk_score, recommendations = predict_injury_risk(features)
    
    # Determine risk level
    if risk_score < 30:
        risk_level = "low"
    elif risk_score < 60:
        risk_level = "medium"
    else:
        risk_level = "high"
    
    # Calculate diet score (simple version)
    diet_score = 100 - abs(avg_protein - 150) / 2  # Target: 150g protein/day
    
    # Save to database
    risk_entry = RiskScore(
        user_id=user_id,
        score=risk_score,
        risk_level=risk_level,
        diet_score=diet_score,
        recommendations=recommendations
    )
    db.add(risk_entry)
    db.commit()
    db.refresh(risk_entry)
    
    return risk_entry

@router.get("/risk-history/{user_id}")
def get_risk_history(user_id: int, db: Session = Depends(get_db)):
    """
    Get risk score history
    """
    scores = db.query(RiskScore).filter(
        RiskScore.user_id == user_id
    ).order_by(RiskScore.calculated_at.desc()).limit(30).all()
    
    return scores
