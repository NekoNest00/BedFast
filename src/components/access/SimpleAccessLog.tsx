
import React from "react";

interface LogEntry {
  label: string;
  time: Date;
}

interface SimpleAccessLogProps {
  logEntries: LogEntry[];
}

export default function SimpleAccessLog({ logEntries }: SimpleAccessLogProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Access Log</h3>
      <div className="space-y-2 text-xs text-muted-foreground">
        {logEntries.map((entry, index) => (
          <div key={index} className={`flex justify-between py-1 ${index < logEntries.length - 1 ? 'border-b' : ''}`}>
            <span>{entry.label}</span>
            <span>{entry.time.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
