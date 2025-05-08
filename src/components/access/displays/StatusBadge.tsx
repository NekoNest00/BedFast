
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X } from "lucide-react";

export type AccessStatus = "active" | "upcoming" | "expired";

interface StatusBadgeProps {
  accessStatus: AccessStatus;
}

export default function StatusBadge({ accessStatus }: StatusBadgeProps) {
  // Consistent icon size for all status indicators
  const iconSize = 12;
  
  switch (accessStatus) {
    case "active":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1 px-3 py-1 h-6 text-xs font-medium w-[110px] justify-center">
          <Check size={iconSize} className="flex-shrink-0" />
          <span>Active</span>
        </Badge>
      );
    case "upcoming":
      return (
        <Badge 
          variant="outline" 
          className="border-amber-500 text-amber-500 flex items-center gap-1 px-3 py-1 h-6 text-xs font-medium w-[120px] justify-center"
        >
          <Clock size={iconSize} className="flex-shrink-0" />
          <span>Not Yet Active</span>
        </Badge>
      );
    case "expired":
      return (
        <Badge 
          variant="outline" 
          className="border-gray-400 text-gray-400 flex items-center gap-1 px-3 py-1 h-6 text-xs font-medium w-[110px] justify-center"
        >
          <X size={iconSize} className="flex-shrink-0" />
          <span>Expired</span>
        </Badge>
      );
    default:
      return null;
  }
}
