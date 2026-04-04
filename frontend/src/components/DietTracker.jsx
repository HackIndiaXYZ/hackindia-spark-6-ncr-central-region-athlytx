import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { logDiet, getDietSummary, getFoodDatabase } from '../services/api';
import toast from 'react-hot-toast';

export default function DietTracker() {
  const { user } = useStore();
  const [foodDb, setFoodDb] = useState({});
  const [selectedFood, setSelectedFood] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [mealType, setMealType] = useState('breakfast');
  const [todaySummary, setTodaySummary] = useState(null);

  useEffect(() => {
    fetchFoodDatabase();
    fetchTodaySummary();
  }, [user]);

  const fetchFoodDatabase = async () => {
    try {
      const response = await getFoodDatabase();
      setFoodDb(response.data);
    } catch (error) {
      console.error('Failed to fetch food database:', error);
    }
  };

  const fetchTodaySummary = async () => {
    if (!user) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await getDietSummary(user.id, today);
      setTodaySummary(response.data);
    } catch (error) {
      console.error('Failed to fetch diet summary:', error);
    }
  };

  const handleLogDiet = async (e) => {
    e.preventDefault();
    
    if (!selectedFood) {
      toast.error('Please select a food item');
      return;
    }

    try {
      await logDiet({
        user_id: user.id,
        meal_type: mealType,
        food_item: selectedFood,
        quantity_grams: quantity
      });
      
      toast.success('Diet logged successfully!');
      setSelectedFood('');
      setQuantity(100);
      fetchTodaySummary();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to log diet');
    }
  };

  const getMacros = () => {
    if (!selectedFood || !foodDb[selectedFood]) return null;
    const food = foodDb[selectedFood];
    const multiplier = quantity / 100;
    
    return {
      calories: (food.calories * multiplier).toFixed(1),
      protein: (food.protein * multiplier).toFixed(1),
      carbs: (food.carbs * multiplier).toFixed(1),
      fats: (food.fats * multiplier).toFixed(1)
    };
  };

  const macros = getMacros();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Diet Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Log Diet Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Log Meal</h2>
          
          <form onSubmit={handleLogDiet} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Food Item</label>
              <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select food...</option>
                {Object.keys(foodDb).map((food) => (
                  <option key={food} value={food}>
                    {food.charAt(0).toUpperCase() + food.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Quantity (grams): {quantity}g
              </label>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {macros && (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Nutrition Info</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Calories: <span className="font-semibold">{macros.calories} kcal</span></div>
                  <div>Protein: <span className="font-semibold">{macros.protein}g</span></div>
                  <div>Carbs: <span className="font-semibold">{macros.carbs}g</span></div>
                  <div>Fats: <span className="font-semibold">{macros.fats}g</span></div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Log Meal
            </button>
          </form>
        </div>

        {/* Today's Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
          
          {todaySummary ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <div className="text-4xl font-bold text-blue-600">
                  {todaySummary.total_calories.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Calories</div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span className="font-semibold">{todaySummary.total_protein.toFixed(1)}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((todaySummary.total_protein / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Target: 150g</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span className="font-semibold">{todaySummary.total_carbs.toFixed(1)}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((todaySummary.total_carbs / 300) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Target: 300g</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fats</span>
                    <span className="font-semibold">{todaySummary.total_fats.toFixed(1)}g</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((todaySummary.total_fats / 70) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Target: 70g</div>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-4">
                Meals logged: {todaySummary.meals_logged}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No meals logged today
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
