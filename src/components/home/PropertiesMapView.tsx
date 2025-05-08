
import React from "react";
import { Property } from "../PropertyCard";
import OpenStreetMapView from "../OpenStreetMapView";
import MapStyles from "../map/MapStyles";

interface PropertiesMapViewProps {
  properties: Property[];
}

export default function PropertiesMapView({ properties }: PropertiesMapViewProps) {
  return (
    <div className="h-[calc(100vh-240px)] mb-6">
      <MapStyles />
      <OpenStreetMapView properties={properties} />
    </div>
  );
}
