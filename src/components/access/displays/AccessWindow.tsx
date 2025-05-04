
import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface AccessWindowProps {
  startDate?: Date;
  endDate?: Date;
}

export default function AccessWindow({ startDate, endDate }: AccessWindowProps) {
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
    <div className="flex items-center text-sm text-muted-foreground">
      <Clock size={14} className="mr-1" /> Access Window: {formatAccessWindow()}
    </div>
  );
}
