
import React from "react";
import { Filter } from "lucide-react";

interface FilterButtonProps {
  onOpen: () => void;
}

export function FilterButton({ onOpen }: FilterButtonProps) {
  return (
    <button 
      onClick={onOpen}
      className="category-pill bg-muted text-brand-red flex items-center gap-1 whitespace-nowrap"
    >
      <Filter size={14} />
      <span>Filters</span>
    </button>
  );
}
