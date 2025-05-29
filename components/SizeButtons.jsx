"use client";

import { useState } from "react";

const sizes = ["S", "M", "L", "XL"];

export default function SizeSelector({ onSelectFunc }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = (size) => {
    setSelectedSize(size);
    onSelectFunc(size); // 通知父層選擇哪個尺寸
  };

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => handleSelect(size)}
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
