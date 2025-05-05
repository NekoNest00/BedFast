
import { useState, useEffect } from "react";
import { Property } from "../components/PropertyCard";
import { FilterOptions } from "../components/PropertyFilter";
import { toast } from "@/hooks/use-toast";

export function useProperties() {
  const [sortOption, setSortOption] = useState("Top Rated");
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    propertyTypes: [],
    instant: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);

  // Fetch mock properties
  useEffect(() => {
    const mockProperties = [
      {
        id: "prop1",
        name: "Modern Downtown Apartment",
        location: "Downtown, New York",
        price: 149,
        rating: 4.92,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"],
        instant: true,
      },
      {
        id: "prop2",
        name: "Luxury Beach House",
        location: "Malibu, California",
        price: 299,
        rating: 4.87,
        images: ["https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3"],
        instant: true,
      },
      {
        id: "prop3",
        name: "Mountain View Cabin",
        location: "Aspen, Colorado",
        price: 179,
        rating: 4.95,
        images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3"],
        instant: false,
      },
      {
        id: "prop4",
        name: "Downtown Loft",
        location: "Chicago, Illinois",
        price: 129,
        rating: 4.81,
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3"],
        instant: true,
      },
      {
        id: "prop5",
        name: "Waterfront Villa",
        location: "Miami, Florida",
        price: 359,
        rating: 4.89,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"],
        instant: true,
      },
      {
        id: "prop6",
        name: "Modern Condo",
        location: "Seattle, Washington",
        price: 219,
        rating: 4.78,
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3"],
        instant: false,
      },
    ];
    
    // Simulate API loading delay
    setTimeout(() => {
      setProperties(mockProperties);
      setIsLoading(false);
      toast({
        title: "Welcome to BedFast",
        description: "Discover smart-access properties in your area",
      });
    }, 1500);
  }, []);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      propertyTypes: [],
      instant: false
    });
    
    toast({
      title: "Filters cleared",
      description: "Showing all available properties",
    });
  };

  return {
    properties,
    isLoading,
    filters,
    setFilters,
    sortOption,
    setSortOption,
    clearFilters
  };
}
