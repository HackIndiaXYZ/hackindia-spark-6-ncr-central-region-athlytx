import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Create dummy model for demonstration purposes
def train_dummy_model():
    print("Training dummy ML model for injury prediction...")
    
    # Generate random training data
    # Features: avg_calories, avg_protein, bmi, training_days
    X = np.random.rand(100, 4) * [3000, 150, 30, 7]
    y = np.random.rand(100) * 100 # Risk scores from 0-100
    
    model = RandomForestRegressor(n_estimators=10)
    model.fit(X, y)
    
    # Save the model
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    model_path = os.path.join(os.path.dirname(__file__), 'trained_model.pkl')
    
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_dummy_model()
