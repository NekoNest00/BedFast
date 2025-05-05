
import { useMemo } from "react";
import { Property } from "../components/PropertyCard";
import { FilterOptions } from "../components/PropertyFilter";

export function useFilteredProperties(
  properties: Property[],
  filters: FilterOptions,
  sortOption: string,
  showRecommended: boolean
) {
  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // If showing recommendations, skip regular filtering
      if (showRecommended) {
        return false;
      }
      
      // Price range filter
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }
      
      // Property type filter (mocked since we don't have this property in our data)
      if (filters.propertyTypes.length > 0) {
        // This is a mock implementation - in a real app you'd have proper property types
        const mockTypeMap: Record<string, string[]> = {
          "Apartment": ["Modern Downtown Apartment", "Downtown Loft"],
          "House": ["Luxury Beach House"],
          "Condo": ["Modern Condo"],
          "Villa": ["Waterfront Villa", "Mountain View Cabin"]
        };
        
        const matchesAnyType = filters.propertyTypes.some(type => {
          return mockTypeMap[type]?.includes(property.name);
        });
        
        if (!matchesAnyType) return false;
      }
      
      // Instant access filter
      if (filters.instant && !property.instant) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort based on selected option
      switch (sortOption) {
        case "Top Rated":
          return b.rating - a.rating;
        case "Lowest Price":
          return a.price - b.price;
        case "Highest Price":
          return b.price - a.price;
        case "Closest":
          // This would use actual distance calculation in a real app
          // Here we're just using a mock implementation
          return a.location.includes("Downtown") ? -1 : 1;
        default:
          return 0;
      }
    });
  }, [properties, filters, sortOption, showRecommended]);

  return filteredProperties;
}
