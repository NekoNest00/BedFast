
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-3 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}
