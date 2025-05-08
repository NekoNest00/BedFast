
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property } from "./PropertyCard";
import { useNavigate } from "react-router-dom";
import useGeolocation from "@/hooks/useGeolocation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
  
  // Use the geolocation hook
  const { coords, error, loading, permissionState } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });

  // Get user location or use default
  const userLocation: [number, number] = coords 
    ? [coords.longitude, coords.latitude] 
    : [-74.006, 40.7128]; // Default to New York

  const handleRequestLocation = () => {
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(() => {}, () => {});
  };

  // Initialize map when container and token are available
  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: userLocation as [number, number],
      zoom: 13,
      language: 'en', // Set English as default language
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      "top-right"
    );

    // Add user location marker with pulsing effect
    if (coords) {
      const userLocationEl = document.createElement('div');
      userLocationEl.className = 'user-location-dot';
      userLocationEl.style.width = '16px';
      userLocationEl.style.height = '16px';
      userLocationEl.style.borderRadius = '50%';
      userLocationEl.style.backgroundColor = '#3886F6';
      userLocationEl.style.border = '3px solid white';
      userLocationEl.style.boxShadow = '0 0 0 2px rgba(56, 134, 246, 0.3)';
      userLocationEl.style.animation = 'pulse 1.5s infinite';

      new mapboxgl.Marker({ element: userLocationEl })
        .setLngLat(userLocation as [number, number])
        .addTo(map.current);
    }

    // Add property markers
    markersRef.current = properties.map(property => {
      // Create random locations near the user location
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

    // Add language control
    const languageControl = document.createElement('div');
    languageControl.className = 'mapboxgl-ctrl mapboxgl-ctrl-group language-control';
    languageControl.innerHTML = '<button class="mapboxgl-ctrl-language">EN</button>';
    languageControl.style.margin = '10px';
    languageControl.style.fontWeight = 'bold';
    
    const controlContainer = document.createElement('div');
    controlContainer.className = 'mapboxgl-ctrl-top-left';
    controlContainer.appendChild(languageControl);
    
    mapContainer.current.appendChild(controlContainer);

    // Add map style
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(56, 134, 246, 0.7);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(56, 134, 246, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(56, 134, 246, 0);
        }
      }
      .language-control button {
        padding: 5px 8px;
        background: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
      document.head.removeChild(style);
    };
  }, [mapToken, userLocation, properties, navigate, coords]);

  // Render location permission UI
  const renderPermissionUI = () => {
    if (permissionState === 'denied') {
      return (
        <div className="absolute bottom-20 left-4 z-10 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg max-w-xs">
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
        <div className="absolute bottom-20 left-4 z-10 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-lg max-w-xs">
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
        <div className="absolute top-4 right-20 z-10 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Loader2 size={14} className="animate-spin text-muted-foreground" />
            <span className="text-xs">Getting location...</span>
          </div>
        </div>
      );
    }
    
    return null;
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
      {renderPermissionUI()}
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
