
import React from "react";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (value: number[]) => void;
}

export default function PriceRangeFilter({ 
  priceRange, 
  maxPrice, 
  onPriceChange 
}: PriceRangeFilterProps) {
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-2">Price Range</h4>
      <Slider
        defaultValue={[priceRange[0], priceRange[1]]}
        max={maxPrice}
        step={10}
        onValueChange={onPriceChange}
        className="mb-2"
      />
      <div className="flex items-center justify-between text-sm">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
}
