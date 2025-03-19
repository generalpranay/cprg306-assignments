"use client";

import { useState, useEffect } from "react";

// Function to fetch meal ideas based on the ingredient
const fetchMealIdeas = async (ingredient) => {
  try {
    if (!ingredient) return [];

    console.log("Fetching meals for:", ingredient); // Debugging log

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const data = await response.json();

    console.log("API Response:", data); // Debugging log

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

// MealIdeas component definition
const MealIdeas = ({ ingredient, onRecipeSelect }) => {
  // State to store fetched meals, initially an empty array
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Function to load meal ideas based on the ingredient
  const loadMealIdeas = async () => {
    if (!ingredient) {
      setMeals([]); // Clear meals if ingredient is not provided
      return;
    }

    setLoading(true); // Set loading to true when starting the fetch
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas); // Update the meals state with fetched data
    setLoading(false); // Set loading to false after the fetch is complete
  };

  const handleMealClick = async (id) => {
    const recipe = await fetchRecipe(id);
    if (recipe) {
      onRecipeSelect(`https://www.themealdb.com/meal/${id}`);
    }
  };

  // Using useEffect to call loadMealIdeas whenever the ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2>Meal Ideas for {typeof ingredient === "string" ? ingredient : ingredient?.name || "..."}</h2>
      {loading ? (
        <p>Loading meal ideas...</p>
      ) : meals.length > 0 ? (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {meals.map((meal) => (
            <li key={meal.idMeal} style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center", width: "150px" }}>
              <button onClick={() => handleMealClick(meal.idMeal)} style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%", marginBottom: "5px" }} />
                <div style={{ fontSize: "0.9em" }}>{meal.strMeal}</div>
              </button>
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