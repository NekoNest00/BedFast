import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useRecommendations } from "@/hooks/useRecommendations";
import RecommendationCarousel from "@/components/recommendations/RecommendationCarousel";

export default function ViewingDetails() {
  const { id } = useParams<{ id: string }>();
  const userLocation = "New York"; // This would normally come from user's profile or geolocation
  
  const { recommendedProperties, nearbyProperties, loading } = useRecommendations(id, userLocation);
  
  return (
    <Layout>
      <div className="container-app py-8">
        <h1 className="text-2xl font-bold mb-6">Your Scheduled Viewing</h1>
        
        <div className="my-8">
          <h2 className="text-lg font-semibold mb-4">Viewing Information</h2>
          <div className="p-6 border rounded-lg">
            <p className="text-muted-foreground">Details for viewing ID: {id}</p>
            {/* More viewing details would go here */}
          </div>
        </div>
        
        {/* AI-powered recommendations */}
        {!loading && (
          <>
            {recommendedProperties.length > 0 && (
              <RecommendationCarousel
                title="You Might Also Like" 
                description="Properties similar to the one you're viewing"
                properties={recommendedProperties}
              />
            )}
            
            {nearbyProperties.length > 0 && (
              <RecommendationCarousel
                title="Other Properties Nearby" 
                properties={nearbyProperties}
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
