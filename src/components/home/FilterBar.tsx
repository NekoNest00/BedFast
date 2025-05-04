
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import PropertyFilter, { FilterOptions, SortButton } from "../PropertyFilter";
import RecommendationButton from "../recommendations/RecommendationButton";

interface FilterBarProps {
  filters: FilterOptions;
  showRecommended: boolean;
  sortOption: string;
  onFilterChange: (filters: FilterOptions) => void;
  onRecommendedToggle: () => void;
  onSortChange: (value: string) => void;
}

export default function FilterBar({
  filters,
  showRecommended,
  sortOption,
  onFilterChange,
  onRecommendedToggle,
  onSortChange
}: FilterBarProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
        {/* AI Recommendation Button */}
        <RecommendationButton 
          onClick={onRecommendedToggle} 
          active={showRecommended} 
        />
        
        {/* Enhanced Filters Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              <Filter size={18} className="mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh]">
            <PropertyFilter 
              filters={filters} 
              onFilterChange={onFilterChange} 
              maxPrice={500}
            />
          </SheetContent>
        </Sheet>
        
        {/* Sort Button */}
        <SortButton 
          currentSort={sortOption} 
          onSortChange={onSortChange} 
        />
      </div>
    </div>
  );
}
