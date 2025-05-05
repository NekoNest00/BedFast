
import React from "react";

export default function ViewingInstructions() {
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
      <h3 className="font-medium mb-2">How to Use Your Viewing Access</h3>
      <ol className="list-decimal pl-5 space-y-1 text-sm">
        <li>Arrive at the property during your access window</li>
        <li>Locate the digital keypad near the front entrance</li>
        <li>Enter your PIN code shown above</li>
        <li>The door will unlock automatically</li>
        <li>Your PIN will deactivate after your access window ends</li>
      </ol>
    </div>
  );
}
