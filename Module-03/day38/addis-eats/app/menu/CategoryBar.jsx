"use client";

import { useState } from "react";

const categories = [
  "All",
  "Traditional Stews & Wat",
  "Tibs & Grills",
  "Fasting & Vegan / Tsom",
  "Beverages & Tej",
];

export default function CategoryBar() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelected(category)}
            className={`rounded-full px-4 py-2 text-sm ${
              selected === category
                ? "bg-gray-900 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-600">Selected: {selected}</p>
    </div>
  );
}
