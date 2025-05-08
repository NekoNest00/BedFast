
import React, { useEffect } from "react";

export default function MapboxStyles() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-map {
        width: 100%;
        height: 100%;
      }
      .mapboxgl-ctrl-top-right {
        top: 10px;
        right: 10px;
      }
      .property-marker {
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
