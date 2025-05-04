
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "./displays/StatusBadge";
import AccessWindow from "./displays/AccessWindow";
import OfflineIndicator from "./displays/OfflineIndicator";
import AccessHeader from "./displays/AccessHeader";
import PinCodeDisplay from "./displays/PinCodeDisplay";
import PinMetadata from "./displays/PinMetadata";
import { useAccessPin } from "@/hooks/useAccessPin";

interface AccessPinDisplayProps {
  pin: string;
  propertyName: string;
  startDate?: Date;
  endDate?: Date;
  isOffline?: boolean;
  pinIssueTime?: Date;
}

export default function AccessPinDisplay({ 
  pin, 
  propertyName,
  startDate,
  endDate,
  isOffline = false,
  pinIssueTime = new Date(),
}: AccessPinDisplayProps) {
  const [lastSyncTime, setLastSyncTime] = useState<Date | undefined>(
    isOffline ? new Date() : undefined
  );
  
  // When going offline, record the last sync time
  useEffect(() => {
    if (isOffline && !lastSyncTime) {
      setLastSyncTime(new Date());
    }
  }, [isOffline]);
  
  const { accessStatus, hoursRemaining, shouldShowPin } = useAccessPin({
    startDate,
    endDate,
    isOffline,
    lastSyncTime
  });
  
  return (
    <Card className="w-full border shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900/30 dark:to-indigo-900/20 pb-3">
        <div className="flex justify-between items-center mb-1">
          <CardTitle className="text-lg">{propertyName}</CardTitle>
          <StatusBadge accessStatus={accessStatus} />
        </div>
        <AccessWindow startDate={startDate} endDate={endDate} />
      </CardHeader>
      
      <CardContent className="p-5 space-y-4">
        <OfflineIndicator isOffline={isOffline} lastSyncTime={lastSyncTime} />
        
        <AccessHeader 
          accessStatus={accessStatus} 
          hoursRemaining={hoursRemaining} 
          startDate={startDate}
        />
        
        <div className="pt-2 pb-1">
          <PinCodeDisplay 
            pin={pin} 
            shouldShow={shouldShowPin} 
            accessStatus={accessStatus} 
          />
        </div>
        
        <PinMetadata pinIssueTime={pinIssueTime} lastSyncTime={lastSyncTime} />
      </CardContent>
    </Card>
  );
}
