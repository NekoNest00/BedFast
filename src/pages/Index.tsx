import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import PropertyCard, { Property } from "../components/PropertyCard";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { Map, List, Filter } from "lucide-react";
import PropertyMap from "../components/PropertyMap";
import PropertyFilter, { FilterOptions, SortButton } from "../components/PropertyFilter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import RecommendationButton from "../components/recommendations/RecommendationButton";
import { useRecommendations } from "../hooks/useRecommendations";

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
  const [mapboxToken, setMapboxToken] = useState<string>("");
  
  // Fetch AI recommendations
  const { recommendations, isLoading } = useRecommendations();
  
  // Mock property data
  const [properties, setProperties] = useState<Property[]>([
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
  ]);

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
  };

  const recommendedPropertySet = recommendations.find(rec => rec.type === 'personalized');

  return (
    <Layout>
      <div className="container-app">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">BedFast</h1>
            <p className="text-sm text-muted-foreground">Find and access homes instantly</p>
          </div>
          <ThemeToggle />
        </div>

        {/* View toggle */}
        <div className="mb-4 flex justify-center">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "map" | "list")}>
            <ToggleGroupItem value="map" aria-label="Map View">
              <Map className="mr-2" size={16} />
              Map
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List View">
              <List className="mr-2" size={16} />
              List
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Filters and For You button */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {/* AI Recommendation Button */}
            <RecommendationButton 
              onClick={toggleRecommended} 
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
                  onFilterChange={setFilters} 
                  maxPrice={500}
                />
              </SheetContent>
            </Sheet>
            
            {/* Sort Button */}
            <SortButton 
              currentSort={sortOption} 
              onSortChange={setSortOption} 
            />
          </div>
        </div>

        {/* Map View */}
        {viewMode === "map" && !showRecommended && (
          <div className="h-[calc(100vh-240px)] mb-6">
            <PropertyMap 
              properties={filteredProperties} 
              mapboxToken={mapboxToken} 
            />
          </div>
        )}

        {/* AI Recommendations View - Just displaying as a list now */}
        {showRecommended && recommendedPropertySet && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">{recommendedPropertySet.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{recommendedPropertySet.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {recommendedPropertySet.properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && !showRecommended && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
            
            {filteredProperties.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-2">No properties match your current filters</p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({
                    priceRange: [0, 500],
                    propertyTypes: [],
                    instant: false
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
