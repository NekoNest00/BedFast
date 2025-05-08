
import React from "react";
import { Button } from "@/components/ui/button";
import GuestNameForm from "./GuestNameForm";
import AccessDurationSlider from "../forms/AccessDurationSlider";

interface FormSectionProps {
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  contactMethod: "email" | "sms";
  setContactMethod: (method: "email" | "sms") => void;
  accessHours: number;
  setAccessHours: (hours: number) => void;
  maxHours: number;
  propertyName: string;
  startDate: Date;
  endDate: Date;
  isGenerating: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GuestAccessFormSection({
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  guestPhone,
  setGuestPhone,
  contactMethod,
  setContactMethod,
  accessHours,
  setAccessHours,
  maxHours,
  propertyName,
  startDate,
  endDate,
  isGenerating,
  onSubmit
}: FormSectionProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Create temporary access for guests during your stay at {propertyName}.
          Guest access is limited to your booking period from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}.
        </p>
      </div>
      
      <GuestNameForm
        guestName={guestName}
        setGuestName={setGuestName}
        guestEmail={guestEmail}
        setGuestEmail={setGuestEmail}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        contactMethod={contactMethod}
        setContactMethod={setContactMethod}
      />
      
      <AccessDurationSlider
        accessHours={accessHours}
        setAccessHours={setAccessHours}
        maxHours={maxHours}
      />
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Guest PIN"}
      </Button>
    </form>
  );
}
