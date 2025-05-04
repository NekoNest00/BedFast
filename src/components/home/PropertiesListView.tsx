
import React from "react";
import PropertyCard, { Property } from "../PropertyCard";
import { Button } from "@/components/ui/button";

interface PropertiesListViewProps {
  properties: Property[];
  onClearFilters?: () => void;
}

export default function PropertiesListView({ properties, onClearFilters }: PropertiesListViewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
      
      {properties.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-2">No properties match your current filters</p>
          {onClearFilters && (
            <Button 
              variant="outline" 
              onClick={onClearFilters}
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
