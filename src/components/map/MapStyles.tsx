
import React from 'react';

export function MapStyles() {
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
      .pulse-animation {
        animation: pulse 2s infinite;
        box-shadow: 0 0 0 rgba(59, 130, 246, 0.7);
      }
      @keyframes pulse {
        0% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
        }
        70% {
          transform: scale(1);
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
        100% {
          transform: scale(0.95);
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
        }
      }
      .leaflet-div-icon {
        background: transparent;
        border: none;
      }
      `}
    </style>
  );
}

export default MapStyles;
