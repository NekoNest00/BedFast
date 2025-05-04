
import React from "react";
import { ChevronDown } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

interface SortButtonProps {
  currentSort: string;
  onSortChange: (value: string) => void;
}

export function SortButton({ 
  currentSort, 
  onSortChange 
}: SortButtonProps) {
  const sortOptions = ["Closest", "Top Rated", "Lowest Price", "Highest Price"];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="category-pill bg-muted text-brand-red whitespace-nowrap">
          <span>Sort: {currentSort}</span>
          <ChevronDown size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48" align="start">
        <div className="flex flex-col space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`p-2 text-sm text-left rounded-md hover:bg-muted ${
                currentSort === option ? "bg-muted text-brand-red font-medium" : ""
              }`}
              onClick={() => onSortChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
