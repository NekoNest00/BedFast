
import React from "react";
import { WifiOff, Clock } from "lucide-react";
import { format } from "date-fns";

interface OfflineIndicatorProps {
  isOffline: boolean;
  lastSyncTime?: Date;
}

export default function OfflineIndicator({ isOffline, lastSyncTime }: OfflineIndicatorProps) {
  if (!isOffline) return null;
  
  return (
    <div className="bg-brand-red/5 dark:bg-brand-red/10 border border-brand-red/20 dark:border-brand-red/30 rounded-md p-3 space-y-2">
      <div className="flex items-center gap-2">
        <WifiOff size={16} className="text-brand-red" />
        <p className="text-sm text-brand-red">Offline Mode – PIN retrieved securely</p>
      </div>
      
      {lastSyncTime && (
        <div className="flex items-center gap-2 text-xs text-brand-red/80">
          <Clock size={14} />
          <span>Last synced: {format(lastSyncTime, "MMM d, h:mm a")}</span>
        </div>
      )}
      
      <p className="text-xs text-brand-red/80">
        Reconnect to get updated access information. Your cached PIN will work if still within your access window.
      </p>
    </div>
  );
}
