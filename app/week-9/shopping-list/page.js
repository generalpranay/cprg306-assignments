"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // 🛠 Move this to ensure hooks aren't skipped
  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.replace("/week-9"); // Use `replace` to prevent back navigation
    }
  }, [user, router]);

  // 🛠 Don't return early, use conditional rendering inside JSX instead!
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState(null);

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    let itemName = typeof item === "object" ? item.name : item;
    if (typeof itemName === "string" && itemName.trim() !== "") {
      console.log("Clicked item:", itemName);
      let cleanedName = itemName.split(",")[0].trim().replace(/[^\w\s]/gi, "");
      console.log("Selected ingredient:", cleanedName);
      setSelectedItemName(cleanedName);
      setSelectedRecipeUrl(null);
    }
  };

  const handleRecipeSelect = (recipeUrl) => {
    setSelectedRecipeUrl(recipeUrl);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px" }}>
      {!isClient || !user ? (
        <p>Redirecting...</p>
      ) : (
        <>
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
            {selectedItemName && <MealIdeas ingredient={selectedItemName} onRecipeSelect={handleRecipeSelect} />}
            {selectedRecipeUrl && (
              <div>
                <h2>Recipe</h2>
                <iframe src={selectedRecipeUrl} width="100%" height="500px" title="Recipe" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
