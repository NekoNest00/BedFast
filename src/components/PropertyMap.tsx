
import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "./PropertyCard";
import { useGeolocation } from "../hooks/useGeolocation";
import { useMapboxMap } from "../hooks/useMapboxMap";
import MapLocationStatus from "./map/MapLocationStatus";
import MapTokenInput from "./map/MapTokenInput";
import MapboxStyles from "./map/MapboxStyles";

interface PropertyMapProps {
  properties: Property[];
  mapboxToken?: string;
}

export default function PropertyMap({ properties, mapboxToken }: PropertyMapProps) {
  const [mapToken, setMapToken] = useState<string>(mapboxToken || "");
  const { position, loading, error } = useGeolocation();
  const { mapContainer } = useMapboxMap({
    properties,
    mapboxToken: mapToken,
    position
  });

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {!mapToken && (
        <MapTokenInput onTokenSubmit={setMapToken} />
      )}
      
      {/* Location Status Indicator */}
      {mapToken && (
        <MapLocationStatus 
          loading={loading} 
          error={error} 
          position={position} 
        />
      )}
      
      <div ref={mapContainer} className="h-full w-full" />
      <MapboxStyles />
    </div>
  );
}
