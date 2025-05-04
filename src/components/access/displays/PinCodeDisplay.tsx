
import React from "react";

interface PinCodeDisplayProps {
  pin: string;
  shouldShow: boolean;
  accessStatus: "active" | "upcoming" | "expired";
}

export default function PinCodeDisplay({ pin, shouldShow, accessStatus }: PinCodeDisplayProps) {
  if (!shouldShow) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
        <p className="text-muted-foreground">
          {accessStatus === "upcoming" ? 
            "Your PIN will be displayed when your access period begins" : 
            "Your access period has ended"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 justify-center">
        {pin.split('').map((digit, i) => (
          <div 
            key={i} 
            className="w-11 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-xl font-bold"
          >
            {digit}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Use this PIN to unlock your door at the property
      </p>
    </div>
  );
}
