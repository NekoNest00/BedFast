
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Property } from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

interface UseMapboxMapOptions {
  properties: Property[];
  mapboxToken?: string;
  position: { lat: number; lng: number } | null;
}

export function useMapboxMap({ properties, mapboxToken, position }: UseMapboxMapOptions) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    console.info("Initializing Mapbox map...");
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    const defaultPosition: [number, number] = position ? 
      [position.lng, position.lat] : 
      [-74.006, 40.7128]; // Default to New York if no position
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: defaultPosition,
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
      
      // Create custom pin HTML
      const userPinElement = document.createElement('div');
      userPinElement.className = 'user-location-pin';
      userPinElement.innerHTML = `
        <div class="pin-container">
          <div class="pin-pulse"></div>
          <div class="pin-dot"></div>
          <div class="pin-label">You are here</div>
        </div>
      `;

      // Add custom styles to the pin
      const style = document.createElement('style');
      style.textContent = `
        .user-location-pin {
          width: 32px;
          height: 40px;
        }
        .pin-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .pin-pulse {
          width: 24px;
          height: 24px;
          background-color: rgba(56, 134, 246, 0.3);
          border-radius: 50%;
          position: absolute;
          top: 0;
          animation: pulse 2s infinite;
        }
        .pin-dot {
          width: 16px;
          height: 16px;
          background-color: #3886F6;
          border: 2px solid white;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 8px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
        }
        .pin-label {
          margin-top: 24px;
          background-color: white;
          padding: 2px 6px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: bold;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.9;
          }
          70% {
            transform: scale(1.5);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      
      // Add user location marker with the custom element
      new mapboxgl.Marker(userPinElement)
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
  }, [mapboxToken, position, properties, navigate]);

  return { mapContainer };
}
