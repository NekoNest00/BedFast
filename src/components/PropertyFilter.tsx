
import React from "react";
import { X } from "lucide-react";
import PriceRangeFilter from "./filters/PriceRangeFilter";
import PropertyTypeFilter from "./filters/PropertyTypeFilter";
import InstantAccessFilter from "./filters/InstantAccessFilter";
import FilterActionButtons from "./filters/FilterActionButtons";
export { FilterButton } from "./filters/FilterButton";
export { SortButton } from "./filters/SortButton";

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
    // Ensure we always have exactly two values for priceRange
    const priceRange: [number, number] = [
      value[0] || 0,
      value[1] || maxPrice
    ];
    
    setLocalFilters({
      ...localFilters,
      priceRange
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
    const defaultFilters: FilterOptions = {
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
      
      {/* Price Range Filter */}
      <PriceRangeFilter 
        priceRange={localFilters.priceRange}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
      />
      
      {/* Property Type Filter */}
      <PropertyTypeFilter 
        selectedTypes={localFilters.propertyTypes}
        onTypeChange={handlePropertyTypeChange}
      />
      
      {/* Instant Access Filter */}
      <InstantAccessFilter 
        checked={localFilters.instant}
        onCheckedChange={handleInstantChange}
      />
      
      {/* Action Buttons */}
      <FilterActionButtons 
        onReset={resetFilters}
        onApply={applyFilters}
      />
    </div>
  );
}
