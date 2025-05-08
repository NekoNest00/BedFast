
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";

interface PropertyMapProps {
  properties: Property[];
  mapboxToken?: string;
}

export default function PropertyMap({ properties, mapboxToken }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapToken, setMapToken] = useState<string>(mapboxToken || "");
  const navigate = useNavigate();

  // Request user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.longitude, position.coords.latitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
        // Default to New York if location access is denied
        setUserLocation([-74.006, 40.7128]);
      }
    );
  }, []);

  // Initialize map when container and token are available
  useEffect(() => {
    if (!mapContainer.current || !mapToken || !userLocation) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: userLocation,
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // Add user location marker
    new mapboxgl.Marker({ color: "#3886F6" })
      .setLngLat(userLocation)
      .addTo(map.current);

    // Add property markers
    markersRef.current = properties.map(property => {
      // Create random locations near the user location for demo purposes
      // In a real app, you would use actual property coordinates
      const randomLng = userLocation[0] + (Math.random() - 0.5) * 0.05;
      const randomLat = userLocation[1] + (Math.random() - 0.5) * 0.05;
      
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
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, [mapToken, userLocation, properties, navigate]);

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
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
