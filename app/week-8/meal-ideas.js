"use client";

import { useState, useEffect } from "react";

const fetchMealIdeas = async (ingredient) => {
  try {
    if (!ingredient) return [];
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

const fetchRecipe = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
};

const MealIdeas = ({ ingredient, onRecipeSelect }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const loadMealIdeas = async () => {
    if (!ingredient) {
      setMeals([]);
      setSelectedMealId(null);
      setRecipe(null);
      return;
    }

    setLoading(true);
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
    setLoading(false);
    setSelectedMealId(null);
    setRecipe(null);
  };

  const handleMealClick = async (id) => {
    if (selectedMealId === id) {
      setSelectedMealId(null);
      setRecipe(null);
      onRecipeSelect(null);
    } else {
      setSelectedMealId(id);
      const fetchedRecipe = await fetchRecipe(id);
      setRecipe(fetchedRecipe);
      if (fetchedRecipe) {
        onRecipeSelect(`https://www.themealdb.com/meal/${id}`);
      }
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2>Meal Ideas for {typeof ingredient === "string" ? ingredient : ingredient?.name || "..."}</h2>
      {loading ? (
        <p>Loading meal ideas...</p>
      ) : meals.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {meals.map((meal) => (
            <li key={meal.idMeal} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => handleMealClick(meal.idMeal)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e0e0e0",
                  padding: "8px",
                  width: "250px",
                  textAlign: "left",
                  background: selectedMealId === meal.idMeal ? "#f5f5f5" : "white",
                  cursor: "pointer",
                  borderRadius: "5px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: "50px", height: "50px", marginRight: "12px", borderRadius: "5px" }}
                />
                <div style={{ fontSize: "0.9em", color: "#333" }}>{meal.strMeal}</div>
              </button>
              {selectedMealId === meal.idMeal && recipe && (
                <div style={{ padding: "8px", backgroundColor: "#f9f9f9", borderRadius: "5px", marginTop: "5px", border: "1px solid #e0e0e0", fontSize: '0.8em', color: '#222' }}>
                  <h3 style={{fontSize: '1em', marginBottom: '5px', color: '#222'}}>{recipe.strMeal}</h3>
                  <p style={{color: '#222'}}>{recipe.strInstructions}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No meal ideas found.</p>
      )}
    </div>
  );
};

export default MealIdeas;