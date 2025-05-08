
import React from "react";

interface LocationStatusProps {
  loading: boolean;
  error: string | null;
  position: { lat: number; lng: number } | null;
}

export default function LocationStatus({ loading, error, position }: LocationStatusProps) {
  if (loading) {
    return (
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-full shadow-md z-20 flex items-center space-x-2">
        <div className="animate-spin h-4 w-4 border-2 border-brand-red border-t-transparent rounded-full"></div>
        <span className="text-xs">Locating you...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-full shadow-md z-20 flex items-center space-x-2">
        <div className="h-4 w-4 bg-red-500 rounded-full"></div>
        <span className="text-xs">Location error</span>
      </div>
    );
  }
  
  if (position) {
    return (
      <div className="absolute top-4 left-4 bg-background/80 p-2 rounded-full shadow-md z-20 flex items-center space-x-2">
        <div className="h-4 w-4 bg-green-500 rounded-full"></div>
        <span className="text-xs">Location found</span>
      </div>
    );
  }
  
  return null;
}
