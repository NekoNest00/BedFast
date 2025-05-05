
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useTheme } from "../context/ThemeContext";
import { useRecommendations } from "../hooks/useRecommendations";
import { useProperties } from "../hooks/useProperties";
import { useFilteredProperties } from "../hooks/useFilteredProperties";
import { useRecommendationToggle } from "../hooks/useRecommendationToggle";

// Import our components
import HomeHeader from "../components/home/HomeHeader";
import ViewToggle from "../components/home/ViewToggle";
import FilterBar from "../components/home/FilterBar";
import PropertiesMapView from "../components/home/PropertiesMapView";
import PropertiesListView from "../components/home/PropertiesListView";
import RecommendationsView from "../components/home/RecommendationsView";

export default function Index() {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  
  // Use our custom hooks
  const { 
    properties, 
    isLoading, 
    filters, 
    setFilters, 
    sortOption, 
    setSortOption, 
    clearFilters 
  } = useProperties();
  
  const { showRecommended, toggleRecommended } = useRecommendationToggle();
  
  // Fetch AI recommendations
  const { recommendations, isLoading: isLoadingRecommendations } = useRecommendations();
  
  // Filter properties
  const filteredProperties = useFilteredProperties(
    properties,
    filters,
    sortOption,
    showRecommended
  );

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
