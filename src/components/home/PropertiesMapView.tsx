
import React from "react";
import { Property } from "../PropertyCard";
import PropertyMap from "../PropertyMap";

interface PropertiesMapViewProps {
  properties: Property[];
  mapboxToken: string;
}

export default function PropertiesMapView({ properties, mapboxToken }: PropertiesMapViewProps) {
  return (
    <div className="h-[calc(100vh-240px)] mb-6">
      <PropertyMap 
        properties={properties} 
        mapboxToken={mapboxToken} 
      />
    </div>
  );
}
