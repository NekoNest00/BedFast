
import React from "react";
import PinDisplay from "../displays/PinDisplay";

interface GuestPinDisplayProps {
  pin: string;
  propertyName: string;
  startDate: Date;
  endDate: Date;
}

export default function GuestPinDisplay({
  pin,
  propertyName,
  startDate,
  endDate
}: GuestPinDisplayProps) {
  return (
    <PinDisplay
      pin={pin}
      accessStatus="active"
      propertyName={propertyName}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
