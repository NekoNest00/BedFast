
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, X } from "lucide-react";

export type AccessStatus = "active" | "upcoming" | "expired";

interface StatusBadgeProps {
  accessStatus: AccessStatus;
}

export default function StatusBadge({ accessStatus }: StatusBadgeProps) {
  switch (accessStatus) {
    case "active":
      return (
        <Badge className="bg-brand-red hover:bg-brand-red/90 flex items-center justify-center gap-1 px-2 py-1 h-6 min-w-[80px] text-xs font-medium">
          <Check size={12} />
          <span>Active</span>
        </Badge>
      );
    case "upcoming":
      return (
        <Badge 
          variant="outline" 
          className="border-amber-500 text-amber-500 flex items-center justify-center gap-1 px-2 py-1 h-6 min-w-[80px] text-xs font-medium"
        >
          <Clock size={12} />
          <span>Not Active Yet</span>
        </Badge>
      );
    case "expired":
      return (
        <Badge 
          variant="outline" 
          className="border-gray-400 text-gray-400 flex items-center justify-center gap-1 px-2 py-1 h-6 min-w-[80px] text-xs font-medium"
        >
          <X size={12} />
          <span>Expired</span>
        </Badge>
      );
    default:
      return null;
  }
}
