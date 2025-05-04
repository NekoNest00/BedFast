
import React from "react";
import { WifiOff } from "lucide-react";

interface OfflineIndicatorProps {
  isOffline: boolean;
}

export default function OfflineIndicator({ isOffline }: OfflineIndicatorProps) {
  if (!isOffline) return null;
  
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md p-3 flex items-center gap-2">
      <WifiOff size={16} className="text-amber-600 dark:text-amber-400" />
      <p className="text-sm text-amber-700 dark:text-amber-300">You're viewing a cached PIN while offline.</p>
    </div>
  );
}
