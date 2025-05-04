
import React from "react";
import { format } from "date-fns";

interface PinMetadataProps {
  pinIssueTime: Date;
  lastSyncTime?: Date;
}

export default function PinMetadata({ pinIssueTime, lastSyncTime }: PinMetadataProps) {
  return (
    <div className="border-t pt-3 text-xs text-muted-foreground space-y-1">
      <div className="flex justify-between">
        <span>PIN issued:</span>
        <span>{format(pinIssueTime, "MMM d, yyyy h:mm a")}</span>
      </div>
      <div className="flex justify-between">
        <span>Last verified:</span>
        <span>{lastSyncTime ? format(lastSyncTime, "MMM d, yyyy h:mm a") : format(new Date(), "MMM d, yyyy h:mm a")}</span>
      </div>
    </div>
  );
}
