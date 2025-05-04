
import React from "react";
import PropertyCard from "../PropertyCard";
import { RecommendationSet } from "@/hooks/useRecommendations";

interface RecommendationsViewProps {
  recommendationSet: RecommendationSet | undefined;
}

export default function RecommendationsView({ recommendationSet }: RecommendationsViewProps) {
  if (!recommendationSet) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{recommendationSet.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{recommendationSet.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {recommendationSet.properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
