
import React from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

interface LogEntry {
  time: Date;
  action: string;
}

interface AccessLogProps {
  accessLog: LogEntry[];
}

export default function AccessLog({ accessLog }: AccessLogProps) {
  if (accessLog.length === 0) {
    return null;
  }

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <h4 className="text-sm font-medium mb-2">Access Log</h4>
        <div className="space-y-2 text-xs text-muted-foreground max-h-28 overflow-y-auto">
          {accessLog.map((entry, i) => (
            <div key={i} className="flex justify-between py-1 border-b">
              <span>{entry.action}</span>
              <span>{format(entry.time, "h:mm a")}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
