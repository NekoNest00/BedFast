
import React, { useState, useEffect } from "react";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useLeafletMap } from "../hooks/useLeafletMap";
import LocationStatus from "./map/LocationStatus";
import MapStyles from "./map/MapStyles";

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

  // Add an effect to track when the map is loaded
  useEffect(() => {
    if (mapInstance) {
      setMapLoaded(true);
    }
  }, [mapInstance]);

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden">
      {/* Status indicator */}
      <LocationStatus loading={loading} error={error} position={position} />
      
      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 z-10 w-full h-full" />
      
      {/* Custom styles */}
      <MapStyles />
    </div>
  );
}
