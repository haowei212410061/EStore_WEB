"use client"; // for Next.js app directory

import { useState } from "react";

const sizes = ["S", "M", "L", "XL"];

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`w-10 h-10 border rounded-md text-sm font-medium
            ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}
            hover:border-black transition`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}