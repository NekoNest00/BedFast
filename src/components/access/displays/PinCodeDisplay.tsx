
import React from "react";
import { motion } from "framer-motion";

interface PinCodeDisplayProps {
  pin: string;
  shouldShow: boolean;
  accessStatus: "active" | "upcoming" | "expired";
}

export default function PinCodeDisplay({ pin, shouldShow, accessStatus }: PinCodeDisplayProps) {
  if (!shouldShow) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {accessStatus === "upcoming" ? 
            "Your PIN will be displayed when your access period begins" : 
            "Your access period has ended"}
        </motion.p>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <div className="space-y-2 px-2">
      <motion.div 
        className="flex gap-2 justify-center max-w-xs mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pin.split('').map((digit, i) => (
          <motion.div 
            key={i} 
            className="w-10 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-xl font-bold flex-1"
            variants={itemVariants}
          >
            {digit}
          </motion.div>
        ))}
      </motion.div>
      <motion.p 
        className="text-center text-sm text-muted-foreground mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Use this PIN to unlock your door at the property
      </motion.p>
    </div>
  );
}
