
import React, { useState, useEffect } from "react";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLeafletMap } from "../hooks/useLeafletMap";
import LocationStatus from "./map/LocationStatus";
import MapStyles from "./map/MapStyles";
import MapPlaceholder from "./map/MapPlaceholder";

interface OpenStreetMapViewProps {
  properties: Property[];
}

export default function OpenStreetMapView({ properties }: OpenStreetMapViewProps) {
  const navigate = useNavigate();
  const [mapLoaded, setMapLoaded] = useState(false);
  const { position, loading, error } = useGeolocation();
  
  const { mapRef, mapInstance } = useLeafletMap({ 
    properties, 
    position,
    onMapLoaded: () => setMapLoaded(true)
  });

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden">
      {/* Status indicator */}
      <LocationStatus loading={loading} error={error} position={position} />
      
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-10 w-full h-full" />
      
      {/* Loading placeholder */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <MapPlaceholder properties={properties} onPropertyClick={handlePropertyClick} />
        </div>
      )}
      
      {/* Custom styles */}
      <MapStyles />
    </div>
  );
}
