"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems,addItem } from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [items, setItems] = useState([]); // Initialize state with an empty array
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedRecipeUrl, setSelectedRecipeUrl] = useState(null);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.replace("/week-9"); // Redirect if user is not logged in
    }
  }, [user, router]);

  // Load shopping list items for the current user
  const loadItems = async () => {
    if (user?.uid) {
      try {
        const data = await getItems(user.uid);
        setItems(data);
      } catch (error) {
        console.error("Error loading items:", error);
      }
    }
  };

  // Call loadItems when component mounts or when user changes
  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  // Handle adding an item
  const handleAddItem = async (newItem) => {
    if (!user?.uid) return;

    try {
      const itemId = await addItem(user.uid, newItem);
      if (itemId) {
        setItems((prevItems) => [...prevItems, { id: itemId, ...newItem }]);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Handle item selection
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

  // Handle recipe selection
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
