
import React from "react";

export default function MapStyles() {
  return (
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
      .map-pin-pulse {
        animation: map-pin-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      @keyframes map-pin-pulse {
        0% {
          transform: scale(0.8);
          opacity: 0.6;
        }
        50% {
          opacity: 0.2;
        }
        100% {
          transform: scale(1.5);
          opacity: 0;
        }
      }
      `}
    </style>
  );
}
