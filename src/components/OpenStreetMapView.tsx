
import React, { useEffect, useRef } from "react";
import { Property } from "./PropertyCard";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import L from "leaflet";
import type { LatLngTuple } from "leaflet";
import useGeolocation from "@/hooks/useGeolocation";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

// Include Leaflet styles directly in the component
// instead of importing the CSS file
interface OpenStreetMapViewProps {
  properties: Property[];
}

export default function OpenStreetMapView({ properties }: OpenStreetMapViewProps) {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  
  // Default location (New York City)
  const defaultLocation: LatLngTuple = [40.7128, -74.006];
  
  // Use our custom geolocation hook
  const { coords, error, loading, permissionState } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleRequestLocation = () => {
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(defaultLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    // Clear any existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add property markers
    properties.forEach((property) => {
      // For demo purposes, generate random locations near the center
      // If we have user location, use that as the center for random distribution
      const center = coords 
        ? [coords.latitude, coords.longitude] as LatLngTuple
        : defaultLocation;
        
      const randomLat = center[0] + (Math.random() - 0.5) * 0.05;
      const randomLng = center[1] + (Math.random() - 0.5) * 0.05;

      // Create custom icon
      const priceIcon = L.divIcon({
        className: 'custom-price-marker',
        html: `<div class="bg-${property.instant ? 'brand-red' : 'slate-800'} text-white px-2 py-1 rounded-full text-xs font-bold border-2 border-white shadow-md">$${property.price}</div>`,
        iconSize: [40, 20],
        iconAnchor: [20, 10],
      });

      // Create marker with custom icon
      const marker = L.marker([randomLat, randomLng], { icon: priceIcon })
        .addTo(mapInstance.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-medium text-sm">${property.name}</h3>
            <p class="text-xs">$${property.price}/night</p>
          </div>
        `);

      // Add click event listener
      marker.on('click', () => {
        handlePropertyClick(property.id);
      });

      markersRef.current.push(marker);
    });

    // Update map when geolocation changes
    if (coords && mapInstance.current) {
      const userLocation: LatLngTuple = [coords.latitude, coords.longitude];
      
      // Remove previous user marker if it exists
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      
      // Add user location marker with custom icon
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `<div class="bg-blue-500 p-2 rounded-full border-2 border-white shadow-lg pulse-animation"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      
      userMarkerRef.current = L.marker(userLocation, { icon: userIcon })
        .addTo(mapInstance.current)
        .bindPopup('Your location');
      
      // Recenter map to user location with animation
      mapInstance.current.flyTo(userLocation, 14, {
        animate: true,
        duration: 1.5
      });
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [properties, navigate, coords]);

  // Fallback placeholder for when the map is loading or if there's an issue
  const renderPermissionUI = () => {
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
            onClick={handleRequestLocation}
          >
            Enable location
          </Button>
        </div>
      );
    }
    
    if (loading) {
      return (
        <div className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Loader2 size={14} className="animate-spin text-muted-foreground" />
            <span className="text-xs">Getting location...</span>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderPlaceholder = () => (
    <div className="text-center space-y-4 relative z-10 p-8 max-w-lg">
      <h3 className="text-xl font-medium">OpenStreetMap Integration</h3>
      <p className="text-muted-foreground text-sm">Loading map or displaying fallback if the map couldn't be loaded.</p>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {properties.slice(0, 6).map((property, index) => (
          <motion.div 
            key={property.id}
            className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePropertyClick(property.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-brand-red" />
              <span className="text-xs font-medium truncate">{property.name}</span>
            </div>
            <div className="text-xs text-muted-foreground">${property.price}/night</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  // Adding Leaflet CSS inline instead of importing from node_modules
  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4wNyI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0wIDM0djI2aDI0VjM0SDB6TTM2IDBoLTJ2MjRoMjZWMEgzNnptLTEwIDB2MjRoMjRWMEgyNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div ref={mapRef} className="absolute inset-0 z-10"></div>
      {renderPermissionUI()}
      <div className="fallback-content absolute inset-0 flex items-center justify-center z-0">
        {renderPlaceholder()}
      </div>

      {/* Language selector - simple English implementation */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white dark:bg-gray-900 px-3 py-1.5 rounded-md shadow-md text-xs font-medium">
          English
        </div>
      </div>
      
      {/* Map attribution notice */}
      <div className="absolute bottom-1 right-1 z-20 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 px-1 py-0.5 rounded text-[10px] text-muted-foreground">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:underline">OpenStreetMap</a> contributors
      </div>

      <style>
        {`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .custom-price-marker {
          background: transparent;
          border: none;
        }
        .user-location-marker {
          background: transparent;
          border: none;
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
        `}
      </style>
    </div>
  );
}
