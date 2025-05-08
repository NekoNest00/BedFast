
import { useState, useEffect } from 'react';

export interface GeolocationState {
  position: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
  permissionState: PermissionState | null;
}

export function useGeolocation(options?: PositionOptions) {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: true,
    permissionState: null
  });

  useEffect(() => {
    console.info("Initializing geolocation hook...");
    
    // Check if geolocation is available in browser
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        loading: false
      }));
      console.error("Geolocation not supported");
      return;
    }

    // Check permission status if available
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(permissionStatus => {
          console.info("Permission state:", permissionStatus.state);
          setState(prev => ({ ...prev, permissionState: permissionStatus.state }));
          
          // Listen for permission changes
          permissionStatus.onchange = () => {
            console.info("Permission state changed to:", permissionStatus.state);
            setState(prev => ({ ...prev, permissionState: permissionStatus.state }));
          };
        })
        .catch(err => {
          console.error("Error checking permissions:", err);
        });
    }

    // Set up success handler
    const handleSuccess = (position: GeolocationPosition) => {
      console.info("Geolocation successfully retrieved");
      setState({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        error: null,
        loading: false,
        permissionState: state.permissionState
      });
    };

    // Set up error handler
    const handleError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error.message);
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false
      }));
    };

    // Watch position or get current position
    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      defaultOptions
    );

    // Cleanup
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []); // Empty dependency array ensures this only runs once

  return state;
}
