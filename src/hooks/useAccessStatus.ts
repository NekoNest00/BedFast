
import { useState, useEffect } from "react";
import { isAfter, isBefore, differenceInHours, differenceInMinutes } from "date-fns";
import { AccessStatus } from "@/components/access/displays/StatusBadge";

interface AccessWindow {
  accessStart: Date;
  accessEnd: Date;
}

interface AccessStatusResult {
  isWithinAccessWindow: boolean;
  accessStatus: AccessStatus;
  hoursRemaining: number;
  minutesRemaining: number;
  shouldShowPin: boolean;
  formattedTimeRemaining: string;
}

export function useAccessStatus(accessWindow: AccessWindow, offlineMode: boolean = false): AccessStatusResult {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("upcoming");
  const [isWithinAccessWindow, setIsWithinAccessWindow] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<{hours: number, minutes: number}>({ hours: 0, minutes: 0 });
  
  // Update the current time every minute
  useEffect(() => {
    // Initial check
    checkAccessWindow();
    
    // Setup interval to check every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      checkAccessWindow();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [accessWindow]);
  
  // Check if current time is within the access window and calculate status
  const checkAccessWindow = () => {
    const now = new Date();
    
    if (!accessWindow.accessStart || !accessWindow.accessEnd) {
      setIsWithinAccessWindow(false);
      setAccessStatus("expired");
      return;
    }
    
    // Determine the access status
    if (isAfter(now, accessWindow.accessStart) && isBefore(now, accessWindow.accessEnd)) {
      setIsWithinAccessWindow(true);
      setAccessStatus("active");
      
      // Calculate time remaining
      const hours = differenceInHours(accessWindow.accessEnd, now);
      const minutes = differenceInMinutes(accessWindow.accessEnd, now) % 60;
      setTimeRemaining({ hours, minutes });
    } else if (isBefore(now, accessWindow.accessStart)) {
      setIsWithinAccessWindow(false);
      setAccessStatus("upcoming");
    } else {
      setIsWithinAccessWindow(false);
      setAccessStatus("expired");
    }
  };
  
  // Determine if the PIN should be shown
  const shouldShowPin = (): boolean => {
    // Basic rule: Only show PIN if access is active
    if (accessStatus !== "active") return false;
    
    // If in offline mode, show the PIN even if we're slightly outside the access window
    // (this is a fallback for when users are offline during check-in)
    if (offlineMode) {
      // For offline mode, we're more lenient - we'll show the PIN up to 2 hours before check-in
      // and during the entire stay
      const now = new Date();
      const extendedStart = new Date(accessWindow.accessStart);
      extendedStart.setHours(extendedStart.getHours() - 2); // 2 hours before
      
      return isAfter(now, extendedStart) && isBefore(now, accessWindow.accessEnd);
    }
    
    return isWithinAccessWindow;
  };
  
  // Format time remaining as a string
  const getFormattedTimeRemaining = (): string => {
    if (accessStatus !== "active") return "";
    
    const { hours, minutes } = timeRemaining;
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    } else {
      return `${minutes}m remaining`;
    }
  };
  
  return {
    isWithinAccessWindow,
    accessStatus,
    hoursRemaining: timeRemaining.hours,
    minutesRemaining: timeRemaining.minutes,
    shouldShowPin: shouldShowPin(),
    formattedTimeRemaining: getFormattedTimeRemaining()
  };
}
