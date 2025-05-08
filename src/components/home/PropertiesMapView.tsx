
import React from "react";
import { Property } from "../PropertyCard";
import OpenStreetMapView from "../OpenStreetMapView";
import { LeafletStyles } from "../LeafletStyles";

interface PropertiesMapViewProps {
  properties: Property[];
}

export default function PropertiesMapView({ properties }: PropertiesMapViewProps) {
  return (
    <div className="h-[calc(100vh-240px)] mb-6 relative">
      <LeafletStyles />
      <OpenStreetMapView properties={properties} />
    </div>
  );
}
