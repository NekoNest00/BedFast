
import { useState, useEffect } from "react";
import { differenceInHours, isBefore, isAfter } from "date-fns";
import { AccessStatus } from "../components/access/displays/StatusBadge";

interface UseAccessPinParams {
  startDate?: Date;
  endDate?: Date;
  isOffline?: boolean;
}

export function useAccessPin({ startDate, endDate, isOffline = false }: UseAccessPinParams) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [accessStatus, setAccessStatus] = useState<AccessStatus>("upcoming");
  const [hoursRemaining, setHoursRemaining] = useState<number>(0);

  // Update the current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Calculate access status and hours remaining
  useEffect(() => {
    if (!startDate || !endDate) return;
    
    if (isAfter(currentTime, startDate) && isBefore(currentTime, endDate)) {
      setAccessStatus("active");
      const remaining = differenceInHours(endDate, currentTime);
      setHoursRemaining(remaining);
    } else if (isBefore(currentTime, startDate)) {
      setAccessStatus("upcoming");
    } else {
      setAccessStatus("expired");
    }
  }, [currentTime, startDate, endDate]);

  // Function to determine if the PIN should be displayed
  const shouldShowPin = (): boolean => {
    if (!startDate || !endDate) return false;
    
    // If offline, show PIN if we're within a reasonable window (24h before to end of stay)
    if (isOffline) {
      const offlineBuffer = new Date(startDate);
      offlineBuffer.setHours(offlineBuffer.getHours() - 24); // 24h before check-in
      return isAfter(currentTime, offlineBuffer) && isBefore(currentTime, endDate);
    }
    
    // Online - only show if within the exact window
    return accessStatus === "active";
  };

  return {
    currentTime,
    accessStatus,
    hoursRemaining,
    shouldShowPin: shouldShowPin()
  };
}
