
import { useRef, useEffect, useState } from "react";
import L from "leaflet";
import { Property } from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

interface UseLeafletMapOptions {
  properties: Property[];
  position: { lat: number; lng: number } | null;
  onMapLoaded?: () => void;
}

export function useLeafletMap({ properties, position, onMapLoaded }: UseLeafletMapOptions) {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mapInitializedRef = useRef<boolean>(false);

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  // Initialize map
  useEffect(() => {
    console.info("Map initialization effect running");

    // Skip if map is already initialized or container isn't ready
    if (mapInitializedRef.current || !mapRef.current) return;

    console.info("Creating new map instance");
    
    // Default view of map (New York) if geolocation is not available yet
    const defaultLatLng: L.LatLngTuple = [40.7128, -74.006];
    
    // Create map instance
    try {
      const newMap = L.map(mapRef.current, {
        zoomControl: false
      }).setView(
        position ? [position.lat, position.lng] as L.LatLngTuple : defaultLatLng,
        13
      );

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap);
      
      // Add zoom controls to top-right
      L.control.zoom({
        position: 'topright'
      }).addTo(newMap);
      
      console.info("Map initialized successfully");
      
      // Set the map instance and mark as initialized
      setMapInstance(newMap);
      mapInitializedRef.current = true;
      
      // Call the onMapLoaded callback
      if (onMapLoaded) {
        onMapLoaded();
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup function - only executed when component unmounts
    return () => {
      if (mapInitializedRef.current && mapInstance) {
        console.info("Cleaning up map resources");
        markersRef.current.forEach(marker => {
          if (marker) marker.remove();
        });
        markersRef.current = [];
        
        mapInstance.remove();
        mapInitializedRef.current = false;
        setMapInstance(null);
      }
    };
  }, [mapRef.current]); // Only depend on mapRef.current to run once when component mounts

  // Handle user position and markers in a separate effect
  useEffect(() => {
    if (!mapInstance || !mapInitializedRef.current) return;
    
    console.info("Updating markers and position");
    
    // Update map center when position changes
    if (position) {
      try {
        mapInstance.setView([position.lat, position.lng] as L.LatLngTuple, 13);
        
        // Remove previous user location markers
        markersRef.current = markersRef.current.filter(marker => {
          if (marker.options.icon && marker.options.icon.options.className === 'user-location-marker') {
            marker.remove();
            return false;
          }
          return true;
        });
        
        // Add user location marker with a distinct pin style
        const userLocationPin = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div class="flex flex-col items-center">
              <div class="map-pin-pulse w-6 h-6 rounded-full bg-blue-500/20 animate-ping"></div>
              <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <div class="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-md"></div>
              </div>
              <div class="mt-1 px-2 py-1 bg-background text-xs font-medium rounded-full shadow-md border border-border">You</div>
            </div>
          `,
          iconSize: [32, 48],
          iconAnchor: [16, 32],
        });

        const userMarker = L.marker([position.lat, position.lng] as L.LatLngTuple, {
          icon: userLocationPin,
          zIndexOffset: 1000 // Make sure user pin is above all other pins
        }).addTo(mapInstance);

        // Add to markers array for cleanup
        markersRef.current.push(userMarker);
      } catch (error) {
        console.error("Error updating user position:", error);
      }
    }

    // Clear any existing property markers
    markersRef.current = markersRef.current.filter(marker => {
      if (marker.options.icon && marker.options.icon.options.className === 'custom-price-marker') {
        marker.remove();
        return false;
      }
      return true;
    });

    // Add property markers
    try {
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
        const marker = L.marker([randomLat, randomLng] as L.LatLngTuple, { icon: priceIcon })
          .addTo(mapInstance)
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
    } catch (error) {
      console.error("Error adding property markers:", error);
    }

  }, [mapInstance, properties, navigate, position]);

  return { mapRef, mapInstance };
}
