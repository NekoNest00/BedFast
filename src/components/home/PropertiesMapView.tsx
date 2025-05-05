
import React from "react";
import { Property } from "../PropertyCard";
import GoogleMapsPlaceholder from "../GoogleMapsPlaceholder";

interface PropertiesMapViewProps {
  properties: Property[];
}

export default function PropertiesMapView({ properties }: PropertiesMapViewProps) {
  return (
    <div className="h-[calc(100vh-240px)] mb-6">
      <GoogleMapsPlaceholder properties={properties} />
    </div>
  );
}
