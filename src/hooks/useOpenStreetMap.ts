
import { useState, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
import type { LatLngTuple } from 'leaflet';
import useGeolocation from '@/hooks/useGeolocation';
import { Property } from '@/components/PropertyCard';

interface UseOpenStreetMapProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export function useOpenStreetMap({ properties, onPropertyClick }: UseOpenStreetMapProps) {
  const mapInstance = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Default location (New York City)
  const defaultLocation: LatLngTuple = [40.7128, -74.006];
  
  // Use our custom geolocation hook
  const { coords, loading, permissionState } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  const handleRequestLocation = () => {
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  };
  
  // Clean up function for map resources
  const cleanupMap = useCallback(() => {
    // Clean up markers
    markersRef.current.forEach(marker => {
      if (marker) {
        marker.remove();
      }
    });
    markersRef.current = [];
    
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    
    // Remove map instance
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      setMapInitialized(false);
    }
  }, []);
  
  // Function to add property markers to the map
  const addPropertyMarkers = useCallback(() => {
    if (!mapInstance.current) return;
    
    // Clear any existing markers
    markersRef.current.forEach(marker => {
      if (marker) marker.remove();
    });
    markersRef.current = [];
    
    // Get center position for random distribution
    const center = coords 
      ? [coords.latitude, coords.longitude] as LatLngTuple
      : defaultLocation;
    
    // Add property markers
    properties.forEach((property) => {
      // For demo purposes, generate random locations near the center
      const randomLat = center[0] + (Math.random() - 0.5) * 0.05;
      const randomLng = center[1] + (Math.random() - 0.5) * 0.05;

      // Create custom icon
      const priceIcon = L.divIcon({
        className: 'custom-price-marker',
        html: `<div class="bg-${property.instant ? 'brand-red' : 'slate-800'} text-white px-2 py-1 rounded-full text-xs font-bold border-2 border-white shadow-md">$${property.price}</div>`,
        iconSize: [40, 20],
        iconAnchor: [20, 10],
      });

      try {
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
          onPropertyClick(property.id);
        });

        markersRef.current.push(marker);
      } catch (e) {
        console.error('Error adding marker:', e);
      }
    });
  }, [coords, defaultLocation, properties, onPropertyClick]);
  
  // Add user location marker to map
  const addUserLocationMarker = useCallback(() => {
    if (!mapInstance.current || !coords) return;
    
    try {
      // Remove previous user marker if it exists
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      
      const userLocation: LatLngTuple = [coords.latitude, coords.longitude];
      
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
    } catch (e) {
      console.error('Error adding user location marker:', e);
    }
  }, [coords]);
  
  // Initialize map when container ref is available
  const initializeMap = useCallback((container: HTMLDivElement | null) => {
    // Store the container reference
    mapContainerRef.current = container;
    
    // Return early if no container or map already initialized
    if (!container) return cleanupMap;
    
    // Don't reinitialize if the map already exists
    if (mapInstance.current) return cleanupMap;
    
    console.log('Initializing map...');
    
    try {
      // Create the map instance
      mapInstance.current = L.map(container, {
        center: defaultLocation,
        zoom: 13,
        zoomControl: true,
      });

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
      
      setMapInitialized(true);
      console.log('Map initialized successfully');
      
      // Add property markers
      addPropertyMarkers();
    } catch (e) {
      console.error('Error initializing map:', e);
      cleanupMap();
    }
    
    return cleanupMap;
  }, [addPropertyMarkers, cleanupMap, defaultLocation]);
  
  // Update map when geolocation changes
  useEffect(() => {
    if (!mapInitialized || !mapInstance.current) return;
    
    if (coords) {
      addUserLocationMarker();
    }
  }, [coords, mapInitialized, addUserLocationMarker]);
  
  // Update markers when properties change
  useEffect(() => {
    if (!mapInitialized || !mapInstance.current) return;
    addPropertyMarkers();
  }, [properties, mapInitialized, addPropertyMarkers]);
  
  return {
    coords,
    loading,
    permissionState,
    handleRequestLocation,
    initializeMap
  };
}

export default useOpenStreetMap;
