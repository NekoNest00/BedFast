
import React from "react";
import GuestAccessFormSection from "./GuestAccessFormSection";
import GuestAccessResultsSection from "./GuestAccessResultsSection";
import { useGuestAccess } from "@/hooks/useGuestAccess";

interface GuestAccessFormProps {
  propertyName: string;
  startDate: Date;
  endDate: Date;
}

export default function GuestAccessForm({
  propertyName,
  startDate,
  endDate
}: GuestAccessFormProps) {
  const {
    guestName,
    setGuestName,
    guestEmail,
    setGuestEmail,
    guestPhone,
    setGuestPhone,
    isGenerating,
    generatedPin,
    accessHours,
    setAccessHours,
    contactMethod, 
    setContactMethod,
    accessEndTime,
    accessLog,
    maxHours,
    generateGuestPin,
    copyPinToClipboard,
    shareWithGuest,
    revokeAccess
  } = useGuestAccess({ propertyName, startDate, endDate });
  
  return (
    <div className="py-4 space-y-6">
      {!generatedPin ? (
        <GuestAccessFormSection 
          guestName={guestName}
          setGuestName={setGuestName}
          guestEmail={guestEmail}
          setGuestEmail={setGuestEmail}
          guestPhone={guestPhone} 
          setGuestPhone={setGuestPhone}
          contactMethod={contactMethod}
          setContactMethod={setContactMethod}
          accessHours={accessHours}
          setAccessHours={setAccessHours}
          maxHours={maxHours}
          propertyName={propertyName}
          startDate={startDate}
          endDate={endDate}
          isGenerating={isGenerating}
          onSubmit={generateGuestPin}
        />
      ) : (
        <GuestAccessResultsSection
          guestName={guestName}
          generatedPin={generatedPin}
          propertyName={propertyName}
          accessEndTime={accessEndTime}
          accessLog={accessLog}
          contactMethod={contactMethod}
          copyPinToClipboard={copyPinToClipboard}
          shareWithGuest={shareWithGuest}
          revokeAccess={revokeAccess}
        />
      )}
    </div>
  );
}
