
import { useRef, useEffect } from 'react';
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

  const handleRequestLocation = () => {
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  };
  
  const initializeMap = (mapContainer: HTMLDivElement | null) => {
    if (!mapContainer) return;

    // Initialize map if it doesn't exist
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer).setView(defaultLocation, 13);

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
        onPropertyClick(property.id);
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
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  };
  
  return {
    coords,
    loading,
    permissionState,
    handleRequestLocation,
    initializeMap
  };
}

export default useOpenStreetMap;
