
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import PinCodeDisplay from "./PinCodeDisplay";
import AccessWindow from "./AccessWindow";
import StatusBadge from "./StatusBadge";
import PinMetadata from "./PinMetadata";
import OfflineIndicator from "./OfflineIndicator";

interface PinDisplayProps {
  pin: string;
  accessStatus: "active" | "upcoming" | "expired";
  propertyName: string;
  startDate?: Date;
  endDate?: Date;
  isOffline?: boolean;
  lastSyncTime?: Date;
  className?: string;
}

export default function PinDisplay({
  pin,
  accessStatus,
  propertyName,
  startDate,
  endDate,
  isOffline = false,
  lastSyncTime,
  className
}: PinDisplayProps) {
  const pinIssueTime = new Date();
  pinIssueTime.setHours(pinIssueTime.getHours() - 2); // Mock issue time (2 hours ago)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className={cn("space-y-4", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Offline indicator */}
      {isOffline && (
        <motion.div variants={itemVariants}>
          <OfflineIndicator isOffline={isOffline} lastSyncTime={lastSyncTime} />
        </motion.div>
      )}

      <motion.div
        className="bg-background rounded-xl border p-4 shadow-sm"
        variants={itemVariants}
      >
        {/* Property name and status */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{propertyName}</h3>
          <StatusBadge status={accessStatus} />
        </div>

        {/* Access window */}
        <motion.div variants={itemVariants} className="mb-3">
          <AccessWindow startDate={startDate} endDate={endDate} />
        </motion.div>

        {/* PIN code display */}
        <motion.div 
          variants={itemVariants}
          className="my-4"
        >
          <PinCodeDisplay 
            pin={pin} 
            isActive={accessStatus === "active"} 
          />
        </motion.div>

        {/* Pin metadata */}
        <motion.div variants={itemVariants}>
          <PinMetadata 
            pinIssueTime={pinIssueTime} 
            lastSyncTime={lastSyncTime} 
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
