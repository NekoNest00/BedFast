import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Property } from "../components/PropertyCard";
import { useTheme } from "../context/ThemeContext";
import { FilterOptions } from "../components/PropertyFilter";
import { useRecommendations } from "../hooks/useRecommendations";
import { toast } from "@/hooks/use-toast";

// Import our new components
import HomeHeader from "../components/home/HomeHeader";
import ViewToggle from "../components/home/ViewToggle";
import FilterBar from "../components/home/FilterBar";
import PropertiesMapView from "../components/home/PropertiesMapView";
import PropertiesListView from "../components/home/PropertiesListView";
import RecommendationsView from "../components/home/RecommendationsView";

export default function Index() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [sortOption, setSortOption] = useState("Top Rated");
  const [showRecommended, setShowRecommended] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    propertyTypes: [],
    instant: false
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch AI recommendations
  const { recommendations, isLoading: isLoadingRecommendations } = useRecommendations();
  
  // Mock property data
  const [properties, setProperties] = useState<Property[]>([]);

  // Simulate API loading
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

  // Filter and sort properties
  const filteredProperties = properties.filter(property => {
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

  const toggleRecommended = () => {
    setShowRecommended(!showRecommended);
    
    if (!showRecommended) {
      toast({
        title: "For You",
        description: "Showing personalized recommendations based on your preferences",
      });
    }
  };

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

  const recommendedPropertySet = recommendations.find(rec => rec.type === 'personalized');

  return (
    <Layout>
      <div className="container-app">
        {/* Header */}
        <HomeHeader />

        {/* View toggle */}
        <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Filters and For You button */}
        <FilterBar 
          filters={filters}
          showRecommended={showRecommended}
          sortOption={sortOption}
          onFilterChange={setFilters}
          onRecommendedToggle={toggleRecommended}
          onSortChange={setSortOption}
        />

        {/* Map View */}
        {viewMode === "map" && !showRecommended && (
          <PropertiesMapView 
            properties={filteredProperties}
          />
        )}

        {/* AI Recommendations View */}
        {showRecommended && (
          <RecommendationsView 
            recommendationSet={recommendedPropertySet}
            isLoading={isLoadingRecommendations} 
          />
        )}

        {/* List View */}
        {viewMode === "list" && !showRecommended && (
          <PropertiesListView 
            properties={filteredProperties}
            isLoading={isLoading}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </Layout>
  );
}
