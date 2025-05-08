
import React from "react";

interface MapLocationStatusProps {
  loading: boolean;
  error: string | null;
  position: { lat: number; lng: number } | null;
}

export default function MapLocationStatus({ loading, error, position }: MapLocationStatusProps) {
  if (!position && !loading && !error) return null;
  
  return (
    <div className="absolute top-4 left-4 z-20">
      {loading && (
        <div className="bg-background/80 px-3 py-2 rounded-full shadow-md flex items-center space-x-2">
          <div className="animate-spin h-4 w-4 border-2 border-brand-red border-t-transparent rounded-full"></div>
          <span className="text-xs">Locating...</span>
        </div>
      )}
      {error && (
        <div className="bg-background/80 px-3 py-2 rounded-full shadow-md flex items-center space-x-2">
          <div className="h-4 w-4 bg-red-500 rounded-full"></div>
          <span className="text-xs">Location error</span>
        </div>
      )}
      {position && !loading && !error && (
        <div className="bg-background/80 px-3 py-2 rounded-full shadow-md flex items-center space-x-2">
          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
          <span className="text-xs">Location found</span>
        </div>
      )}
    </div>
  );
}
