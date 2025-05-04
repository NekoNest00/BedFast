
import React from "react";

interface AdditionalInfoProps {
  wifiName?: string;
  wifiPassword?: string;
  buildingAccessCode?: string;
}

export default function AdditionalInfo({ 
  wifiName = "ApartmentGuest", 
  wifiPassword = "welcome123", 
  buildingAccessCode = "5678" 
}: AdditionalInfoProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Additional Information</h3>
      <div className="space-y-2 text-sm">
        {(wifiName && wifiPassword) && (
          <p>
            <strong>Wi-Fi:</strong> "{wifiName}" / Password: "{wifiPassword}"
          </p>
        )}
        {buildingAccessCode && (
          <p>
            <strong>Building access code:</strong> {buildingAccessCode} (for main entrance)
          </p>
        )}
      </div>
    </div>
  );
}
