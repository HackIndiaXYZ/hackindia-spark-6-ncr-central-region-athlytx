from typing import Dict, Tuple

def predict_injury_risk(features: Dict) -> Tuple[float, str]:
    """
    Simple rule-based injury risk prediction
    (In production, use trained XGBoost model)
    """
    # Extract features
    avg_calories = features.get("avg_calories", 2000)
    avg_protein = features.get("avg_protein", 100)
    bmi = features.get("bmi", 22)
    training_days = features.get("training_days", 5)
    
    # Simple scoring logic
    risk_score = 0
    recommendations = []
    
    # Calorie check
    if avg_calories < 1800:
        risk_score += 20
        recommendations.append("⚠️ Increase calorie intake (target: 2500-3000 kcal/day)")
    elif avg_calories > 3500:
        risk_score += 15
        recommendations.append("⚠️ High calorie intake - monitor weight gain")
    
    # Protein check
    if avg_protein < 120:
        risk_score += 25
        recommendations.append("🥩 Increase protein intake (target: 150-180g/day)")
    
    # BMI check
    if bmi < 18.5 or bmi > 27:
        risk_score += 20
        recommendations.append("⚖️ BMI outside optimal range for athletes")
    
    # Training load check
    if training_days > 6:
        risk_score += 15
        recommendations.append("😴 Consider adding rest days - overtraining risk")
    
    # Generate final recommendations
    if risk_score < 30:
        recommendations.append("✅ Great job! Keep maintaining your current routine")
    elif risk_score < 60:
        recommendations.append("⚠️ Moderate risk - focus on nutrition and recovery")
    else:
        recommendations.append("🚨 High risk - consult with sports nutritionist/doctor")
    
    return float(risk_score), " | ".join(recommendations)
