
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
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 space-y-2">
      <div className="flex items-center gap-2">
        <WifiOff size={16} className="text-amber-600 dark:text-amber-400" />
        <p className="text-sm text-amber-700 dark:text-amber-300">Offline Mode – PIN retrieved securely</p>
      </div>
      
      {lastSyncTime && (
        <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500">
          <Clock size={14} />
          <span>Last synced: {format(lastSyncTime, "MMM d, h:mm a")}</span>
        </div>
      )}
      
      <p className="text-xs text-amber-600 dark:text-amber-500">
        Reconnect to get updated access information. Your cached PIN will work if still within your access window.
      </p>
    </div>
  );
}
