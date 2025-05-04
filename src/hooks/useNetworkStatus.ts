
import { useState, useEffect } from "react";

export function useNetworkStatus() {
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
  };
  
  return { isOffline, toggleOfflineMode };
}
