
import React from "react";
import { Button } from "@/components/ui/button";

interface AccessTestControlsProps {
  isOffline: boolean;
  toggleOfflineMode: () => void;
}

export default function AccessTestControls({ isOffline, toggleOfflineMode }: AccessTestControlsProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Test Controls (Demo only)</h3>
      <Button
        onClick={toggleOfflineMode}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
      >
        Toggle {isOffline ? "Online" : "Offline"} Mode
      </Button>
    </div>
  );
}
