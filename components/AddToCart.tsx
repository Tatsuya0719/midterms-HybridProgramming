"use client";

import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  const handleAction = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAction}
      className="btn-primary"
      style={{ 
        width: "100%", 
        backgroundColor: added ? "#059669" : "#0f172a",
        padding: "12px"
      }}
    >
      {added ? "✓ Added to Prototype Cart" : "Add to Cart"}
    </button>
  );
}