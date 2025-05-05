
import React from "react";
import { Lock, Clock } from "lucide-react";
import { AccessStatus } from "./StatusBadge";
import { format } from "date-fns";

interface AccessHeaderProps {
  accessStatus: AccessStatus;
  hoursRemaining: number;
  startDate?: Date;
  formattedTimeRemaining?: string;
}

export default function AccessHeader({ 
  accessStatus, 
  hoursRemaining, 
  startDate,
  formattedTimeRemaining
}: AccessHeaderProps) {
  return (
    <div className="flex items-center gap-3 w-full p-2">
      <div className="w-12 h-12 rounded-full bg-brand-red/10 dark:bg-brand-red/20 flex items-center justify-center flex-shrink-0">
        <Lock size={24} className="text-brand-red" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base truncate">Digital Access PIN</h3>
        {accessStatus === "active" && (
          <p className="text-sm text-brand-red flex items-center gap-1 truncate">
            <Clock size={14} className="flex-shrink-0" />
            <span>
              Access active - {formattedTimeRemaining || `${hoursRemaining} hrs remaining`}
            </span>
          </p>
        )}
        {accessStatus === "upcoming" && startDate && (
          <p className="text-sm text-brand-red truncate">
            Activates on {format(startDate, "MMM d")} at {format(startDate, "h:mm a")}
          </p>
        )}
        {accessStatus === "expired" && (
          <p className="text-sm text-gray-500 truncate">Access period has ended</p>
        )}
      </div>
    </div>
  );
}
