
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { Button } from "./ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  
  // Use our geolocation hook
  const { 
    location, 
    loading: locationLoading, 
    error: locationError,
    permissionStatus,
    requestGeolocation
  } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  // Initialize map when container and token are available
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Default to New York if user location isn't available
    const defaultLocation: [number, number] = [-74.006, 40.7128];
    const userLocation: [number, number] = location 
      ? [location.longitude, location.latitude]
      : defaultLocation;

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

    // Add user location marker if available
    if (location) {
      new mapboxgl.Marker({ 
        color: "#3886F6",
        scale: 0.8
      })
      .setLngLat(userLocation)
      .addTo(map.current);
    }

    // Add property markers
    markersRef.current = properties.map(property => {
      // Create random locations near the user location or default location
      const centerLng = userLocation[0];
      const centerLat = userLocation[1];
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
        .setLngLat([randomLng, randomLat] as [number, number])
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
  }, [mapToken, location, properties, navigate]);

  // Handle retry location
  const handleRetryLocation = () => {
    requestGeolocation();
    toast({
      title: "Requesting location",
      description: "Please allow location access when prompted",
    });
  };

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
      
      {/* Location permission UI overlay */}
      {mapToken && permissionStatus === "denied" && (
        <div className="absolute top-4 left-4 z-10 bg-background/90 p-3 rounded-lg shadow-md max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-brand-red" size={18} />
            <h4 className="font-medium text-sm">Location access required</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Enable location services to see properties near you and get accurate directions.
          </p>
          <Button 
            size="sm" 
            className="text-xs w-full"
            onClick={handleRetryLocation}>
            <Navigation className="mr-2 h-3 w-3" /> Request Access
          </Button>
        </div>
      )}
      
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
