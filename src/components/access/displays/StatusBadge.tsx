
import React from "react";
import { Badge } from "@/components/ui/badge";

export type AccessStatus = "active" | "upcoming" | "expired";

interface StatusBadgeProps {
  accessStatus: AccessStatus;
}

export default function StatusBadge({ accessStatus }: StatusBadgeProps) {
  switch (accessStatus) {
    case "active":
      return <Badge className="bg-brand-red hover:bg-brand-red/90">Active</Badge>;
    case "upcoming":
      return <Badge variant="outline" className="border-brand-red text-brand-red">Not Yet Active</Badge>;
    case "expired":
      return <Badge variant="outline" className="border-gray-400 text-gray-400">Expired</Badge>;
    default:
      return null;
  }
}
