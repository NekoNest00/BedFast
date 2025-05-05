
import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface PinDisplayProps {
  generatedPin: string;
  accessEndTime: Date;
}

export default function PinDisplay({ generatedPin, accessEndTime }: PinDisplayProps) {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center w-full">
      <p className="text-sm text-muted-foreground mb-2">Guest PIN</p>
      <div className="flex gap-2 justify-center mb-3 mx-auto">
        {generatedPin.split('').map((digit, i) => (
          <div 
            key={i} 
            className="w-9 h-11 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-mono text-lg font-bold flex-1"
          >
            {digit}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3 flex-shrink-0" />
        <p>
          Expires {format(accessEndTime, "MMM d, h:mm a")}
        </p>
      </div>
    </div>
  );
}
