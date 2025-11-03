// components/DraggableCircle.jsx
import React from "react";
import { useDraggable } from "@dnd-kit/core";

export const DraggableCircle = ({ id, x, y }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <circle
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      cx={x}
      cy={y}
      r={6}
      fill="red"
      style={{ cursor: "grab" }}
    />
  );
};
