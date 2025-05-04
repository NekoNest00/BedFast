
import { useState, useEffect } from "react";
import { isAfter, isBefore } from "date-fns";

interface AccessWindow {
  accessStart: Date;
  accessEnd: Date;
}

export function useAccessStatus(accessWindow: AccessWindow) {
  const [isWithinAccessWindow, setIsWithinAccessWindow] = useState<boolean>(false);
  
  useEffect(() => {
    // Initial check
    checkAccessWindow();
    
    // Setup interval to check every minute
    const interval = setInterval(checkAccessWindow, 60000);
    
    return () => clearInterval(interval);
  }, [accessWindow]);
  
  // Check if current time is within the access window
  const checkAccessWindow = () => {
    const now = new Date();
    const isActive = isAfter(now, accessWindow.accessStart) && 
                     isBefore(now, accessWindow.accessEnd);
    
    setIsWithinAccessWindow(isActive);
  };
  
  return { isWithinAccessWindow };
}
