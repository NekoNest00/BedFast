
import { useState, useEffect } from "react";
import { Property } from "../components/PropertyCard";

export type RecommendationType = 'similar' | 'trending' | 'nearby' | 'personalized';

export interface RecommendationSet {
  type: RecommendationType;
  title: string;
  description: string;
  properties: Property[];
}

export function useRecommendations(
  propertyId?: string,
  userLocation?: string,
  limit: number = 4
): {
  recommendations: RecommendationSet[];
  isLoading: boolean;
  error: Error | null;
} {
  const [recommendations, setRecommendations] = useState<RecommendationSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to a recommendation engine
        // For now, we'll use mock data
        
        // Mock properties
        const mockProperties: Property[] = [
          {
            id: "rec1",
            name: "Luxury Beachfront Villa",
            location: "Malibu, California",
            price: 349,
            rating: 4.96,
            images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3"],
            instant: true,
          },
          {
            id: "rec2",
            name: "Modern Penthouse",
            location: "Manhattan, New York",
            price: 289,
            rating: 4.91,
            images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3"],
            instant: true,
          },
          {
            id: "rec3",
            name: "Mountain Retreat",
            location: "Denver, Colorado",
            price: 199,
            rating: 4.93,
            images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3"],
            instant: false,
          },
          {
            id: "rec4",
            name: "Cozy Lake House",
            location: "Lake Tahoe, California",
            price: 259,
            rating: 4.88,
            images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3"],
            instant: true,
          },
          {
            id: "rec5",
            name: "Urban Loft",
            location: "Chicago, Illinois",
            price: 179,
            rating: 4.89,
            images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"],
            instant: false,
          },
          {
            id: "rec6",
            name: "Seaside Cottage",
            location: "Monterey, California",
            price: 229,
            rating: 4.92,
            images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3"],
            instant: true,
          },
        ];

        // Create recommendation sets based on different criteria
        const recommendationSets: RecommendationSet[] = [
          {
            type: 'similar',
            title: 'Similar Properties',
            description: 'Based on your current selection',
            properties: mockProperties.slice(0, limit),
          },
          {
            type: 'trending',
            title: 'Trending Now',
            description: 'Popular in your area',
            properties: [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, limit),
          },
          {
            type: 'nearby',
            title: 'Near You',
            description: 'Close to your location',
            properties: [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, limit),
          },
          {
            type: 'personalized',
            title: 'Recommended For You',
            description: 'Based on your preferences',
            properties: [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, limit),
          }
        ];

        // Filter to just return the relevant recommendation type based on the context
        const filteredRecommendations = propertyId 
          ? recommendationSets.filter(set => set.type === 'similar' || set.type === 'personalized') 
          : recommendationSets.filter(set => set.type === 'trending' || set.type === 'nearby' || set.type === 'personalized');
        
        setRecommendations(filteredRecommendations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch recommendations'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [propertyId, userLocation, limit]);

  return { recommendations, isLoading, error };
}
