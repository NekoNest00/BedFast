
import React from "react";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLeafletMap } from "../hooks/useLeafletMap";
import LocationStatus from "./map/LocationStatus";
import MapPlaceholder from "./map/MapPlaceholder";
import MapStyles from "./map/MapStyles";

interface OpenStreetMapViewProps {
  properties: Property[];
}

export default function OpenStreetMapView({ properties }: OpenStreetMapViewProps) {
  const navigate = useNavigate();
  const { position, loading, error } = useGeolocation();
  const { mapRef } = useLeafletMap({ properties, position });

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden flex flex-col items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4wNyI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0wIDM0djI2aDI0VjM0SDB6TTM2IDBoLTJ2MjRoMjZWMEgzNnptLTEwIDB2MjRoMjRWMEgyNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      {/* Status indicator */}
      <LocationStatus loading={loading} error={error} position={position} />
      
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-10"></div>
      
      {/* Fallback content */}
      <div className="fallback-content absolute inset-0 flex items-center justify-center z-0">
        <MapPlaceholder properties={properties} onPropertyClick={handlePropertyClick} />
      </div>

      {/* Custom styles */}
      <MapStyles />
    </div>
  );
}
