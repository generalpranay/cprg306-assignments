"use client";

import Item from "./item.js";
import { useState } from "react";

export default function ItemList({ items }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
    });

  return (
    <div>
      <div>
        <button
          onClick={() => setSortBy("name")}
          style={{
            backgroundColor: sortBy === "name" ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "8px",
            margin: "5px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          style={{
            backgroundColor: sortBy === "category" ? "#007bff" : "#ccc",
            color: "#fff",
            padding: "8px",
            margin: "5px",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Sort by Category
        </button>
      </div>
      <ul>
        {sortedItems.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}
