
import React from "react";
import { Badge } from "@/components/ui/badge";

export type AccessStatus = "active" | "upcoming" | "expired";

interface StatusBadgeProps {
  accessStatus: AccessStatus;
}

export default function StatusBadge({ accessStatus }: StatusBadgeProps) {
  switch (accessStatus) {
    case "active":
      return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
    case "upcoming":
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Not Yet Active</Badge>;
    case "expired":
      return <Badge variant="outline" className="border-gray-400 text-gray-400">Expired</Badge>;
    default:
      return null;
  }
}
