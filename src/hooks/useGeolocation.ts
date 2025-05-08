
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface GeolocationState {
  location: {
    latitude: number;
    longitude: number;
  } | null;
  loading: boolean;
  error: string | null;
  permissionStatus: "granted" | "denied" | "prompt" | "unknown";
}

export const useGeolocation = (options?: PositionOptions) => {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
    permissionStatus: "unknown"
  });

  const requestGeolocation = () => {
    setState(prev => ({ ...prev, loading: true }));
    
    // Check for geolocation support
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser",
        permissionStatus: "denied"
      }));
      
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services",
        variant: "destructive"
      });
      
      return;
    }

    // Request permission and get position
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        setState(prev => ({ 
          ...prev, 
          permissionStatus: permissionStatus.state as "granted" | "denied" | "prompt" 
        }));

        // Listen for permission changes
        permissionStatus.addEventListener("change", () => {
          setState(prev => ({ 
            ...prev, 
            permissionStatus: permissionStatus.state as "granted" | "denied" | "prompt" 
          }));
          
          if (permissionStatus.state === "granted") {
            getCurrentPosition();
          }
        });

        // If permission is granted, get position
        if (permissionStatus.state === "granted") {
          getCurrentPosition();
        } else if (permissionStatus.state === "prompt") {
          // Will trigger permission prompt
          getCurrentPosition();
        } else {
          // Permission denied
          setState(prev => ({
            ...prev,
            loading: false,
            error: "Location permission denied",
            permissionStatus: "denied"
          }));
          
          toast({
            title: "Location access denied",
            description: "Please enable location access in your browser settings",
            variant: "destructive"
          });
        }
      })
      .catch(error => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message,
          permissionStatus: "unknown"
        }));
      });
  };

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          loading: false,
          error: null,
          permissionStatus: "granted"
        });
        
        toast({
          title: "Location detected",
          description: "Showing properties near you",
        });
      },
      (error) => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message,
          permissionStatus: error.code === error.PERMISSION_DENIED ? "denied" : "unknown"
        }));
        
        let errorMessage = "Unable to retrieve your location";
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location access denied";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timed out";
        }
        
        toast({
          title: "Location error",
          description: errorMessage,
          variant: "destructive"
        });
      },
      options
    );
  };

  useEffect(() => {
    requestGeolocation();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return {
    ...state,
    requestGeolocation
  };
};
