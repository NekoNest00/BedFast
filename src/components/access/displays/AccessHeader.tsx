
import React from "react";
import { Lock, Clock } from "lucide-react";
import { AccessStatus } from "./StatusBadge";
import { format } from "date-fns";

interface AccessHeaderProps {
  accessStatus: AccessStatus;
  hoursRemaining: number;
  startDate?: Date;
}

export default function AccessHeader({ accessStatus, hoursRemaining, startDate }: AccessHeaderProps) {
  return (
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
  );
}
