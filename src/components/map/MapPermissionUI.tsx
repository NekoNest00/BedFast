
import React from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface MapPermissionUIProps {
  permissionState: PermissionState | null;
  loading: boolean;
  coords: { latitude: number; longitude: number } | null;
  onRequestLocation: () => void;
}

export function MapPermissionUI({ permissionState, loading, coords, onRequestLocation }: MapPermissionUIProps) {
  if (permissionState === 'denied') {
    return (
      <div className="absolute bottom-4 left-4 z-20 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg max-w-xs">
        <h4 className="text-sm font-medium mb-1">Location access denied</h4>
        <p className="text-xs text-muted-foreground mb-2">Enable location in your browser settings to see properties near you</p>
        <Button 
          size="sm" 
          variant="default" 
          className="w-full text-xs"
          onClick={() => window.open('https://support.google.com/chrome/answer/142065', '_blank')}
        >
          How to enable location
        </Button>
      </div>
    );
  }
  
  if (!coords && !loading && permissionState !== 'granted') {
    return (
      <div className="absolute bottom-4 left-4 z-20 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg max-w-xs">
        <h4 className="text-sm font-medium mb-1">Location services</h4>
        <p className="text-xs text-muted-foreground mb-2">Allow location access to see properties near you</p>
        <Button 
          size="sm" 
          variant="default" 
          className="w-full text-xs"
          onClick={onRequestLocation}
        >
          <MapPin size={14} className="mr-1" />
          Enable location
        </Button>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="absolute top-16 right-4 z-20 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2">
          <Loader2 size={14} className="animate-spin text-muted-foreground" />
          <span className="text-xs">Getting location...</span>
        </div>
      </div>
    );
  }
  
  return null;
}

export default MapPermissionUI;
