
import React, { useState } from "react";
import { LockKeyhole, Check } from "lucide-react";

interface SmartLockInterfaceProps {
  propertyId: string;
  propertyName: string;
}

export default function SmartLockInterface({ propertyId, propertyName }: SmartLockInterfaceProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin] = useState("1234"); // In a real app, this would be from API

  const handleUnlock = () => {
    setIsUnlocking(true);
    // Simulate unlocking process
    setTimeout(() => {
      setIsUnlocked(true);
      setIsUnlocking(false);
    }, 1500);
  };

  return (
    <div className="p-6 rounded-xl bg-card card-shadow">
      <h2 className="text-lg font-semibold mb-3">Smart Lock Access</h2>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Your access pin:</p>
        <div className="flex justify-center gap-2 mb-4">
          {pin.split("").map((digit, index) => (
            <div key={index} className="pin-digit bg-muted/50">{digit}</div>
          ))}
        </div>
        <p className="text-xs text-center text-muted-foreground">
          This PIN is valid from your check-in until check-out
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <button
            onClick={handleUnlock}
            disabled={isUnlocking || isUnlocked}
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isUnlocked 
                ? "bg-brand-teal text-white" 
                : "bg-primary text-white"
            } transition-all`}
            aria-label="Unlock door"
          >
            {isUnlocked ? (
              <Check size={30} />
            ) : (
              <LockKeyhole size={30} className={isUnlocking ? "animate-unlock" : ""} />
            )}
          </button>
          {isUnlocking && (
            <>
              <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring"></span>
            </>
          )}
        </div>
        <p className="text-foreground font-medium">
          {isUnlocked 
            ? "Door Unlocked!" 
            : isUnlocking 
              ? "Unlocking..." 
              : "Tap to unlock"
          }
        </p>
        <p className="text-xs text-muted-foreground mt-1">{propertyName}</p>
      </div>
    </div>
  );
}
