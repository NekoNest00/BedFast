
import React, { useEffect, useRef } from "react";
import { Property } from "./PropertyCard";
import { MapPin, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button } from "./ui/button";
import L from "leaflet";
import { LatLngTuple } from "leaflet";

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
  
  // Use our geolocation hook
  const { 
    location, 
    loading: locationLoading, 
    permissionStatus,
    requestGeolocation
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Default to New York if user location isn't available
    const defaultLocation: LatLngTuple = [40.7128, -74.006];
    const userLocation: LatLngTuple = location 
      ? [location.latitude, location.longitude]
      : defaultLocation;

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(userLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
    } else {
      // If map exists, just update the view
      mapInstance.current.setView(userLocation, 13);
    }

    // Clear any existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add user location marker if available
    if (location) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `<div class="bg-blue-500 rounded-full p-1 border-2 border-white shadow-md"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      
      L.marker([location.latitude, location.longitude], { icon: userIcon })
        .addTo(mapInstance.current!)
        .bindPopup('Your location');
    }

    // Add property markers
    properties.forEach((property) => {
      // Generate locations near user location or default
      const centerLat = userLocation[0];
      const centerLng = userLocation[1];
      const randomLat = centerLat + (Math.random() - 0.5) * 0.05;
      const randomLng = centerLng + (Math.random() - 0.5) * 0.05;

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

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [properties, navigate, location]);

  // Fallback placeholder for when the map is loading or if there's an issue
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
      
      {permissionStatus === "denied" && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Location access denied</p>
          <Button 
            size="sm" 
            className="text-xs"
            onClick={() => requestGeolocation()}>
            <Navigation className="mr-2 h-3 w-3" /> Enable Location
          </Button>
        </div>
      )}
    </div>
  );

  // Adding Leaflet CSS inline instead of importing from node_modules
  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4wNyI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0wIDM0djI2aDI0VjM0SDB6TTM2IDBoLTJ2MjRoMjZWMEgzNnptLTEwIDB2MjRoMjRWMEgyNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div ref={mapRef} className="absolute inset-0 z-10"></div>
      <div className="fallback-content absolute inset-0 flex items-center justify-center z-0">
        {renderPlaceholder()}
      </div>

      {/* Location permission UI overlay */}
      {permissionStatus === "denied" && (
        <div className="absolute top-4 left-4 z-20 bg-background/90 p-3 rounded-lg shadow-md max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-brand-red" size={18} />
            <h4 className="font-medium text-sm">Location access required</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Enable location services to see properties near you.
          </p>
          <Button 
            size="sm" 
            className="text-xs w-full"
            onClick={() => requestGeolocation()}>
            <Navigation className="mr-2 h-3 w-3" /> Request Access
          </Button>
        </div>
      )}

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
        .custom-user-marker {
          background: transparent;
          border: none;
        }
        `}
      </style>
    </div>
  );
}
