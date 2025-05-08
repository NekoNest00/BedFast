
import React, { useEffect, useRef } from "react";
import { Property } from "./PropertyCard";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import L from "leaflet";
import { useGeolocation } from "../hooks/useGeolocation";

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
  const { position, loading, error, permissionState } = useGeolocation();

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    console.info("Initializing map...");

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      // Default view of map (New York) if geolocation is not available yet
      const defaultPosition = [40.7128, -74.006];
      
      mapInstance.current = L.map(mapRef.current).setView(
        position ? [position.lat, position.lng] : defaultPosition,
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
      
      console.info("Map initialized successfully");
    }

    // Update map center when position changes
    if (position && mapInstance.current) {
      mapInstance.current.setView([position.lat, position.lng], 13);
      
      // Add user location marker
      const userMarker = L.marker([position.lat, position.lng], {
        icon: L.divIcon({
          className: 'user-location-marker',
          html: `<div class="bg-brand-red rounded-full w-4 h-4 border-2 border-white pulse-animation"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        })
      }).addTo(mapInstance.current);

      // Add to markers array for cleanup
      markersRef.current.push(userMarker);
    }

    // Clear any existing property markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add property markers
    properties.forEach((property) => {
      // For demo purposes, generate random locations near user position or New York
      const centerLat = position ? position.lat : 40.7128;
      const centerLng = position ? position.lng : -74.006;
      
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
      if (mapInstance.current) {
        const marker = L.marker([randomLat, randomLng], { icon: priceIcon })
          .addTo(mapInstance.current)
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
      }
    });

    // Cleanup function
    return () => {
      console.info("Cleaning up map resources");
      if (mapInstance.current) {
        markersRef.current.forEach(marker => marker.remove());
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [properties, navigate, position]);

  // Render location status UI
  const renderLocationStatus = () => {
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
  };

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
    </div>
  );

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4wNyI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0wIDM0djI2aDI0VjM0SDB6TTM2IDBoLTJ2MjRoMjZWMEgzNnptLTEwIDB2MjRoMjRWMEgyNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      {renderLocationStatus()}
      <div ref={mapRef} className="absolute inset-0 z-10"></div>
      <div className="fallback-content absolute inset-0 flex items-center justify-center z-0">
        {renderPlaceholder()}
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
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(224, 30, 90, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(224, 30, 90, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(224, 30, 90, 0);
          }
        }
        `}
      </style>
    </div>
  );
}
