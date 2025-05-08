
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface GeolocationState {
  coords: {
    latitude: number;
    longitude: number;
  } | null;
  error: string | null;
  loading: boolean;
  permissionState: PermissionState | null;
}

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    coords: null,
    error: null,
    loading: true,
    permissionState: null
  });

  useEffect(() => {
    // Check if geolocation is available in the browser
    if (!('geolocation' in navigator)) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false
      }));
      return;
    }

    // Check for permissions API support
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName })
        .then(permissionStatus => {
          setState(prev => ({
            ...prev,
            permissionState: permissionStatus.state
          }));

          // Listen for changes to permission state
          permissionStatus.onchange = () => {
            setState(prev => ({
              ...prev,
              permissionState: permissionStatus.state
            }));
            
            // If permission becomes granted, get location
            if (permissionStatus.state === 'granted') {
              getLocation();
            }
          };

          // If permission is already granted, get location
          if (permissionStatus.state === 'granted') {
            getLocation();
          } else if (permissionStatus.state === 'prompt') {
            // Will trigger the permission prompt
            getLocation();
          } else {
            setState(prev => ({
              ...prev,
              error: 'Location permission denied',
              loading: false
            }));
            toast({
              title: 'Location access denied',
              description: 'Enable location in your browser settings to see nearby properties',
              variant: 'destructive'
            });
          }
        })
        .catch(error => {
          console.error('Permission query error:', error);
          // Fallback to direct geolocation request
          getLocation();
        });
    } else {
      // Permissions API not supported, fallback to direct geolocation request
      getLocation();
    }

    function getLocation() {
      setState(prev => ({ ...prev, loading: true }));
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            error: null,
            loading: false,
            permissionState: 'granted'
          });
          
          toast({
            title: 'Location detected',
            description: 'Showing properties near you'
          });
        },
        (error) => {
          setState(prev => ({
            ...prev,
            error: error.message,
            loading: false
          }));
          
          if (error.code === error.PERMISSION_DENIED) {
            toast({
              title: 'Location access denied',
              description: 'Enable location in your browser settings to see nearby properties',
              variant: 'destructive'
            });
          } else {
            toast({
              title: 'Location error',
              description: `Couldn't determine your location: ${error.message}`,
              variant: 'destructive'
            });
          }
        },
        options
      );
    }

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, [options]);

  return state;
}

export default useGeolocation;
