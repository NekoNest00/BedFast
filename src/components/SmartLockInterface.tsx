
import React, { useState, useEffect } from "react";
import { LockKeyhole, Check } from "lucide-react";
import { motion } from "framer-motion";
import { format, differenceInHours, differenceInMinutes } from "date-fns";

interface SmartLockInterfaceProps {
  propertyId: string;
  propertyName: string;
  checkInTime?: Date;
}

export default function SmartLockInterface({ 
  propertyId, 
  propertyName,
  checkInTime 
}: SmartLockInterfaceProps) {
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin] = useState("1234"); // In a real app, this would be from API
  const [countdown, setCountdown] = useState<string>("");

  // Update countdown timer if checkInTime is provided
  useEffect(() => {
    if (!checkInTime) return;
    
    const updateCountdown = () => {
      const now = new Date();
      if (now >= checkInTime) {
        setCountdown("Access now available");
        return;
      }
      
      const hoursRemaining = differenceInHours(checkInTime, now);
      const minutesRemaining = differenceInMinutes(checkInTime, now) % 60;
      
      setCountdown(`${hoursRemaining}h ${minutesRemaining}m until access`);
    };
    
    updateCountdown();
    const timer = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, [checkInTime]);

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
      
      {checkInTime && (
        <div className="mb-4 text-center">
          <span className="text-sm font-medium text-brand-red">{countdown}</span>
        </div>
      )}
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Your access pin:</p>
        <motion.div 
          className="flex justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {pin.split("").map((digit, index) => (
            <motion.div 
              key={index} 
              className="pin-digit bg-muted/50 flex items-center justify-center w-12 h-14 rounded-lg font-mono text-xl font-bold"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              {digit}
            </motion.div>
          ))}
        </motion.div>
        <p className="text-xs text-center text-muted-foreground">
          This PIN is valid from your check-in until check-out
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <motion.button
            onClick={handleUnlock}
            disabled={isUnlocking || isUnlocked}
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isUnlocked 
                ? "bg-brand-teal text-white" 
                : "bg-brand-red text-white"
            } transition-all`}
            whileTap={{ scale: 0.95 }}
            whileHover={!isUnlocking && !isUnlocked ? { scale: 1.05 } : {}}
            aria-label="Unlock door"
          >
            {isUnlocked ? (
              <Check size={30} />
            ) : (
              <LockKeyhole size={30} className={isUnlocking ? "animate-unlock" : ""} />
            )}
          </motion.button>
          {isUnlocking && (
            <motion.span 
              className="absolute inset-0 rounded-full bg-brand-red" 
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ 
                scale: [1, 1.5], 
                opacity: [0.8, 0] 
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeOut"
              }}
            />
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
