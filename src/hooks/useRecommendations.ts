
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "@/components/PropertyCard";

// This hook simulates AI-based recommendations
// In a real application, this would make API calls to a recommendation engine
export function useRecommendations(
  currentPropertyId?: string,
  userLocation?: string,
  limit: number = 6
) {
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([]);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [nearbyProperties, setNearbyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock properties data
  const mockProperties: Property[] = [
    {
      id: "prop1",
      name: "Modern Downtown Loft",
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
      name: "Downtown Studio",
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
    {
      id: "prop7",
      name: "Lakefront Cottage",
      location: "Lake Tahoe, Nevada",
      price: 249,
      rating: 4.92,
      images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3"],
      instant: true,
    },
    {
      id: "prop8",
      name: "City View Penthouse",
      location: "Boston, Massachusetts",
      price: 279,
      rating: 4.85,
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3"],
      instant: false,
    },
  ];

  useEffect(() => {
    // Simulate API call delay
    const fetchData = async () => {
      setLoading(true);
      
      // Wait to simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter out current property if we're on a property page
      const filteredProperties = currentPropertyId 
        ? mockProperties.filter(p => p.id !== currentPropertyId)
        : mockProperties;
      
      // Simulate personalized recommendations based on user data
      // In a real app, this would come from an ML model or recommendation API
      setRecommendedProperties(
        [...filteredProperties].sort(() => Math.random() - 0.5).slice(0, limit)
      );
      
      // Simulate similar properties based on property type/features
      setSimilarProperties(
        [...filteredProperties].sort((a, b) => b.rating - a.rating).slice(0, limit)
      );
      
      // Simulate nearby properties based on location
      if (currentPropertyId) {
        // Find current property location for nearby suggestions
        const currentProperty = mockProperties.find(p => p.id === currentPropertyId);
        if (currentProperty) {
          // In real app, would use coordinates to find nearby properties
          setNearbyProperties(
            filteredProperties
              .filter(p => p.location.includes(currentProperty.location.split(',')[1].trim()))
              .slice(0, limit)
          );
        }
      } else if (userLocation) {
        // User location based nearby properties
        setNearbyProperties(
          filteredProperties
            .filter(p => p.location.includes(userLocation))
            .slice(0, limit)
        );
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [currentPropertyId, userLocation, limit]);
  
  return {
    recommendedProperties,
    similarProperties,
    nearbyProperties,
    loading
  };
}
