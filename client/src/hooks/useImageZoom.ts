// src/hooks/useImageZoom.ts
import { useState } from "react";

export const useImageZoom = () => {
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return {
    zoomed,
    position,
    handleMouseMove,
    onMouseEnter: () => setZoomed(true),
    onMouseLeave: () => setZoomed(false),
  };
};
