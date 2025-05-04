
import React from "react";
import { X, ChevronDown } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Slider
} from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface FilterOptions {
  priceRange: [number, number];
  propertyTypes: string[];
  instant: boolean;
}

interface PropertyFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClose?: () => void;
  maxPrice?: number;
}

export default function PropertyFilter({ 
  filters, 
  onFilterChange, 
  onClose,
  maxPrice = 500
}: PropertyFilterProps) {
  const [localFilters, setLocalFilters] = React.useState<FilterOptions>(filters);
  
  const handlePriceChange = (value: number[]) => {
    setLocalFilters({
      ...localFilters,
      priceRange: [value[0], value[1]]
    });
  };
  
  const handlePropertyTypeChange = (value: string) => {
    let updatedTypes;
    if (localFilters.propertyTypes.includes(value)) {
      updatedTypes = localFilters.propertyTypes.filter(type => type !== value);
    } else {
      updatedTypes = [...localFilters.propertyTypes, value];
    }
    
    setLocalFilters({
      ...localFilters,
      propertyTypes: updatedTypes
    });
  };
  
  const handleInstantChange = (checked: boolean) => {
    setLocalFilters({
      ...localFilters,
      instant: checked
    });
  };
  
  const applyFilters = () => {
    onFilterChange(localFilters);
    onClose?.();
  };
  
  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, maxPrice],
      propertyTypes: [],
      instant: false
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="p-4 bg-background rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-muted">
            <X size={18} />
          </button>
        )}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Price Range</h4>
        <Slider
          defaultValue={[localFilters.priceRange[0], localFilters.priceRange[1]]}
          max={maxPrice}
          step={10}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm">
          <span>${localFilters.priceRange[0]}</span>
          <span>${localFilters.priceRange[1]}</span>
        </div>
      </div>
      
      {/* Property Types */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Property Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {["Apartment", "House", "Condo", "Villa"].map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={localFilters.propertyTypes.includes(type)}
                onCheckedChange={() => handlePropertyTypeChange(type)}
              />
              <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instant Access */}
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="instant-access"
            checked={localFilters.instant}
            onCheckedChange={(checked) => handleInstantChange(checked as boolean)}
          />
          <label htmlFor="instant-access">Instant Access Available</label>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" onClick={resetFilters} className="flex-1">
          Reset All
        </Button>
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export function FilterButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button 
      onClick={onOpen}
      className="category-pill bg-muted text-muted-foreground whitespace-nowrap"
    >
      <span>Filters</span>
    </button>
  );
}

export function SortButton({ 
  currentSort, 
  onSortChange 
}: { 
  currentSort: string; 
  onSortChange: (value: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="category-pill bg-muted text-muted-foreground whitespace-nowrap">
          <span>Sort: {currentSort}</span>
          <ChevronDown size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48" align="start">
        <div className="flex flex-col space-y-1">
          {["Closest", "Top Rated", "Lowest Price", "Highest Price"].map((option) => (
            <button
              key={option}
              className={`p-2 text-sm text-left rounded-md hover:bg-muted ${
                currentSort === option ? "bg-muted font-medium" : ""
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
