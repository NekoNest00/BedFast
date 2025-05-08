
import { useState, useEffect, useRef } from 'react';
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
  
  const timeoutRef = useRef<number | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    // Set mounted flag
    isMounted.current = true;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    
    let watchId: number | null = null;
    let permissionStatusWatcher: PermissionStatus | null = null;

    // Check if geolocation is available in the browser
    if (!('geolocation' in navigator)) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false
      }));
      return;
    }

    // Function to handle successful position
    const handleSuccess = (position: GeolocationPosition) => {
      if (!isMounted.current) return;

      console.log('Geolocation success:', position.coords);
      
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
      
      // Clear the timeout since we got a successful result
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Function to handle position error
    const handleError = (error: GeolocationPositionError) => {
      if (!isMounted.current) return;
      
      console.log('Geolocation error:', error.message, error.code);
      
      setState(prev => ({
        ...prev,
        error: error.message,
        loading: false,
        permissionState: error.code === error.PERMISSION_DENIED ? 'denied' : prev.permissionState
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
      
      // Clear the timeout since we got an error result
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    // Function to get location
    const getLocation = () => {
      setState(prev => ({ ...prev, loading: true }));
      
      // Set a timeout to prevent infinite loading state
      timeoutRef.current = window.setTimeout(() => {
        if (isMounted.current) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: 'Location request timed out'
          }));
          
          toast({
            title: 'Location request timed out',
            description: 'Please try again later',
            variant: 'destructive'
          });
        }
      }, options?.timeout || 10000);
      
      // Start watching position
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: options?.enableHighAccuracy || true,
          timeout: options?.timeout || 5000,
          maximumAge: options?.maximumAge || 0
        }
      );
    };

    // Check for permissions API support
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName })
        .then(permissionStatus => {
          if (!isMounted.current) return;
          
          console.log('Permission state:', permissionStatus.state);
          
          setState(prev => ({
            ...prev,
            permissionState: permissionStatus.state
          }));

          // Listen for changes to permission state
          permissionStatusWatcher = permissionStatus;
          permissionStatus.onchange = () => {
            if (!isMounted.current) return;
            
            console.log('Permission state changed:', permissionStatus.state);
            
            setState(prev => ({
              ...prev,
              permissionState: permissionStatus.state
            }));
            
            // If permission becomes granted, get location
            if (permissionStatus.state === 'granted') {
              getLocation();
            } else if (permissionStatus.state === 'denied') {
              setState(prev => ({
                ...prev,
                error: 'Location permission denied',
                loading: false
              }));
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

    // Cleanup function
    return () => {
      isMounted.current = false;
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      
      if (permissionStatusWatcher) {
        permissionStatusWatcher.onchange = null;
      }
    };
  }, [options]);

  return state;
}

export default useGeolocation;
