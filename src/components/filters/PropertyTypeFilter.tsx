
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface PropertyTypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (value: string) => void;
}

export default function PropertyTypeFilter({ 
  selectedTypes, 
  onTypeChange 
}: PropertyTypeFilterProps) {
  const propertyTypes = ["Apartment", "House", "Condo", "Villa"];
  
  return (
    <div className="mb-6">
      <h4 className="font-medium mb-2">Property Type</h4>
      <div className="grid grid-cols-2 gap-2">
        {propertyTypes.map(type => (
          <div key={type} className="flex items-center space-x-2">
            <Checkbox
              id={`type-${type}`}
              checked={selectedTypes.includes(type)}
              onCheckedChange={() => onTypeChange(type)}
            />
            <label htmlFor={`type-${type}`} className="text-sm">{type}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
