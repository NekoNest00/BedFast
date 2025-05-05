
import React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PinDisplaySize = "sm" | "md" | "lg";

interface PinDisplayProps {
  generatedPin: string;
  accessEndTime: Date;
  size?: PinDisplaySize;
  className?: string;
  showLabel?: boolean;
  showExpiry?: boolean;
}

export default function PinDisplay({ 
  generatedPin, 
  accessEndTime, 
  size = "md", 
  className,
  showLabel = true,
  showExpiry = true
}: PinDisplayProps) {
  // Size variants for pin digits
  const sizeClasses = {
    sm: {
      container: "p-3",
      digit: "w-7 h-9 text-base",
      label: "text-xs mb-1",
      expiry: "text-[10px]"
    },
    md: {
      container: "p-4",
      digit: "w-9 h-11 text-lg",
      label: "text-sm mb-2",
      expiry: "text-xs"
    },
    lg: {
      container: "p-5",
      digit: "w-11 h-14 text-xl",
      label: "text-base mb-3",
      expiry: "text-sm"
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const digitVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <div className={cn(
      "bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center w-full",
      sizeClasses[size].container,
      className
    )}>
      {showLabel && (
        <motion.p 
          className={cn("text-muted-foreground", sizeClasses[size].label)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Guest PIN
        </motion.p>
      )}
      <motion.div 
        className="flex gap-2 justify-center mb-3 mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {generatedPin.split('').map((digit, i) => (
          <motion.div 
            key={i} 
            variants={digitVariants}
            className={cn(
              "rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-mono font-bold flex-1",
              sizeClasses[size].digit
            )}
          >
            {digit}
          </motion.div>
        ))}
      </motion.div>
      {showExpiry && (
        <motion.div 
          className="flex items-center justify-center gap-1 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Clock className={cn("flex-shrink-0", size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3")} />
          <p className={sizeClasses[size].expiry}>
            Expires {format(accessEndTime, "MMM d, h:mm a")}
          </p>
        </motion.div>
      )}
    </div>
  );
}
