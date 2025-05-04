
import React, { useState, useEffect } from "react";
import { format, differenceInHours, isBefore, isAfter } from "date-fns";
import { Lock, Clock, Wifi, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AccessPinDisplayProps {
  pin: string;
  propertyName: string;
  startDate?: Date;
  endDate?: Date;
  isOffline?: boolean;
  pinIssueTime?: Date;
}

type AccessStatus = "active" | "upcoming" | "expired";

export default function AccessPinDisplay({ 
  pin, 
  propertyName,
  startDate,
  endDate,
  isOffline = false,
  pinIssueTime = new Date(),
}: AccessPinDisplayProps) {
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
  
  // Format the status badge
  const renderStatusBadge = () => {
    switch (accessStatus) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Not Yet Active</Badge>;
      case "expired":
        return <Badge variant="outline" className="border-gray-400 text-gray-400">Expired</Badge>;
      default:
        return null;
    }
  };
  
  // Format the access window
  const formatAccessWindow = () => {
    if (!startDate || !endDate) return "No access window set";
    
    const checkInTime = format(startDate, "h:mm a");
    const checkOutTime = format(endDate, "h:mm a");
    const checkInDate = format(startDate, "MMM d, yyyy");
    const checkOutDate = format(endDate, "MMM d, yyyy");
    
    return `${checkInDate} ${checkInTime} - ${checkOutDate} ${checkOutTime}`;
  };

  return (
    <Card className="w-full border shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900/30 dark:to-indigo-900/20 pb-3">
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-lg">{propertyName}</CardTitle>
          {renderStatusBadge()}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={14} className="mr-1" /> Access Window: {formatAccessWindow()}
        </div>
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        {isOffline && (
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 flex items-center gap-2">
            <WifiOff size={16} className="text-amber-600 dark:text-amber-400" />
            <p className="text-sm text-amber-700 dark:text-amber-300">You're viewing a cached PIN while offline.</p>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Lock size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-medium">Digital Access PIN</h3>
            {accessStatus === "active" && (
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                <Clock size={14} />
                Access active - {hoursRemaining} hrs remaining
              </p>
            )}
            {accessStatus === "upcoming" && startDate && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Activates on {format(startDate, "MMM d")} at {format(startDate, "h:mm a")}
              </p>
            )}
            {accessStatus === "expired" && (
              <p className="text-sm text-gray-500">Access period has ended</p>
            )}
          </div>
        </div>
        
        <div className="pt-2 pb-1">
          {shouldShowPin() ? (
            <div className="space-y-2">
              <div className="flex gap-2 justify-center">
                {pin.split('').map((digit, i) => (
                  <div 
                    key={i} 
                    className="w-11 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-xl font-bold"
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-2">
                Use this PIN to unlock your door at the property
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
              <p className="text-muted-foreground">
                {accessStatus === "upcoming" ? 
                  "Your PIN will be displayed when your access period begins" : 
                  "Your access period has ended"}
              </p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-3 text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>PIN issued:</span>
            <span>{format(pinIssueTime, "MMM d, yyyy h:mm a")}</span>
          </div>
          <div className="flex justify-between">
            <span>Last verified:</span>
            <span>{format(new Date(), "MMM d, yyyy h:mm a")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
