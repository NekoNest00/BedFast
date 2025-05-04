
import React from "react";

interface FilterButtonProps {
  onOpen: () => void;
}

export function FilterButton({ onOpen }: FilterButtonProps) {
  return (
    <button 
      onClick={onOpen}
      className="category-pill bg-muted text-muted-foreground whitespace-nowrap"
    >
      <span>Filters</span>
    </button>
  );
}
