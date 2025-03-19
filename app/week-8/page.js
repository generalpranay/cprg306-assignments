"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState(null); // New state for recipe URL

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    let itemName = typeof item === "object" ? item.name : item;
    if (typeof itemName === "string" && itemName.trim() !== "") {
      console.log("Clicked item:", itemName);
      let cleanedName = itemName.split(",")[0].trim();
      cleanedName = cleanedName.replace(/[^\w\s]/gi, "");
      console.log("Selected ingredient:", cleanedName);
      setSelectedItemName(cleanedName);
      setSelectedRecipeUrl(null); // Reset recipe URL when a new item is selected
    }
  };

  const handleRecipeSelect = (recipeUrl) => {
    setSelectedRecipeUrl(recipeUrl);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
      <div style={{ flex: 1 }}>
        <h1>Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList
          items={items}
          onItemSelect={(itemName) => {
            console.log("Item clicked in ItemList:", itemName);
            handleItemSelect(itemName);
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        {selectedItemName && (
          <MealIdeas ingredient={selectedItemName} onRecipeSelect={handleRecipeSelect} />
        )}
        {selectedRecipeUrl && (
          <div>
            <h2>Recipe</h2>
            <iframe
              src={selectedRecipeUrl}
              width="100%"
              height="500px"
              title="Recipe"
            />
          </div>
        )}
      </div>
    </div>
  );
}