
import React from "react";
import GuestPinDisplay from "./GuestPinDisplay";
import GuestPinActions from "./GuestPinActions";
import GuestAccessLog from "./GuestAccessLog";

interface ResultsSectionProps {
  guestName: string;
  generatedPin: string;
  propertyName: string;
  accessEndTime: Date;
  accessLog: {time: Date, action: string}[];
  contactMethod: "email" | "sms";
  copyPinToClipboard: () => void;
  shareWithGuest: () => void;
  revokeAccess: () => void;
}

export default function GuestAccessResultsSection({
  guestName,
  generatedPin,
  propertyName,
  accessEndTime,
  accessLog,
  contactMethod,
  copyPinToClipboard,
  shareWithGuest,
  revokeAccess
}: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">Guest Access Created</h4>
        <p className="text-sm text-muted-foreground">
          Access PIN for {guestName} has been generated
        </p>
      </div>
      
      <GuestPinDisplay
        pin={generatedPin}
        propertyName={propertyName}
        startDate={new Date()}
        endDate={accessEndTime}
      />
      
      <GuestPinActions
        copyPinToClipboard={copyPinToClipboard}
        shareWithGuest={shareWithGuest}
        revokeAccess={revokeAccess}
        contactMethod={contactMethod}
      />
      
      <GuestAccessLog accessLog={accessLog} />
    </div>
  );
}
