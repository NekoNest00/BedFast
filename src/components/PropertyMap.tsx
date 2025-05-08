
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";

interface PropertyMapProps {
  properties: Property[];
  mapboxToken?: string;
}

export default function PropertyMap({ properties, mapboxToken }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapToken, setMapToken] = useState<string>(mapboxToken || "");
  const navigate = useNavigate();
  const { position, loading, error } = useGeolocation();

  // Initialize map when container and token are available
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    console.info("Initializing Mapbox map...");
    
    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    const defaultPosition = position ? 
      [position.lng, position.lat] : 
      [-74.006, 40.7128]; // Default to New York if no position
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: defaultPosition as [number, number],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // Add user location marker if available
    if (position) {
      console.info("Adding user location marker");
      new mapboxgl.Marker({ color: "#3886F6" })
        .setLngLat([position.lng, position.lat])
        .addTo(map.current);
    }

    // Add property markers
    markersRef.current = properties.map(property => {
      // Create random locations near the user location or default location
      const centerLng = position ? position.lng : -74.006;
      const centerLat = position ? position.lat : 40.7128;
      
      const randomLng = centerLng + (Math.random() - 0.5) * 0.05;
      const randomLat = centerLat + (Math.random() - 0.5) * 0.05;
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-medium text-sm">${property.name}</h3>
            <p class="text-xs">$${property.price}/night</p>
          </div>
        `);

      // Create marker element
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `<span>$${property.price}</span>`;
      el.style.backgroundColor = property.instant ? '#e11d48' : '#1e293b';
      el.style.color = 'white';
      el.style.padding = '4px 8px';
      el.style.borderRadius = '16px';
      el.style.fontWeight = 'bold';
      el.style.fontSize = '12px';
      el.style.display = 'flex';
      el.style.justifyContent = 'center';
      el.style.alignItems = 'center';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';

      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([randomLng, randomLat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click event to navigate to property details
      el.addEventListener('click', () => {
        navigate(`/property/${property.id}`);
      });
      
      return marker;
    });

    return () => {
      console.info("Cleaning up Mapbox map resources");
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapToken, position, properties, navigate]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden">
      {!mapToken && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 z-10 p-4">
          <p className="text-sm text-muted-foreground mb-2">Please enter your Mapbox token:</p>
          <input
            type="text"
            className="w-full max-w-sm p-2 border rounded-md mb-2"
            placeholder="pk.eyJ1IjoieW91..."
            onChange={(e) => setMapToken(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Get your token at <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
          </p>
        </div>
      )}
      
      {/* Location Status Indicator */}
      {mapToken && (
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
      )}
      
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
