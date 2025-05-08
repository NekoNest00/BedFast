
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SheetClose } from "@/components/ui/sheet";
import { addHours } from "date-fns";
import GuestNameForm from "./GuestNameForm";
import AccessDurationSlider from "../forms/AccessDurationSlider";
import GuestPinDisplay from "./GuestPinDisplay";
import GuestAccessLog from "./GuestAccessLog";
import GuestPinActions from "./GuestPinActions";

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
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [accessHours, setAccessHours] = useState(24); // Default 24 hours
  const [contactMethod, setContactMethod] = useState<"email" | "sms">("email");
  const [accessEndTime, setAccessEndTime] = useState(new Date(endDate));
  const [accessLog, setAccessLog] = useState<{time: Date, action: string}[]>([]);
  const { toast } = useToast();
  
  // Calculate maximum hours based on booking window
  const maxHours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
  
  const generateGuestPin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!guestName.trim() || (!guestEmail.trim() && !guestPhone.trim())) {
      toast({
        title: "Missing information",
        description: "Please fill in name and either email or phone",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate API call to generate pin
    setTimeout(() => {
      // Generate a random 4 digit pin
      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedPin(pin);
      
      // Calculate access end time based on selected hours
      const calculatedEndTime = addHours(new Date(), accessHours);
      // Make sure it doesn't exceed booking end date
      const finalEndTime = calculatedEndTime > endDate ? endDate : calculatedEndTime;
      setAccessEndTime(finalEndTime);
      
      // Add to access log
      setAccessLog(prev => [
        { 
          time: new Date(), 
          action: `PIN generated for ${guestName}`
        },
        ...prev
      ]);
      
      setIsGenerating(false);
      
      toast({
        title: "Access PIN generated",
        description: `PIN for ${guestName} has been created`,
      });
    }, 1000);
  };
  
  const copyGuestPinToClipboard = () => {
    navigator.clipboard.writeText(generatedPin).then(() => {
      toast({
        title: "PIN Copied",
        description: "Guest PIN copied to clipboard",
      });
      
      // Add to access log
      setAccessLog(prev => [
        { 
          time: new Date(), 
          action: "PIN copied to clipboard"
        },
        ...prev
      ]);
    }, () => {
      toast({
        title: "Copy failed",
        description: "Please copy the PIN manually",
        variant: "destructive",
      });
    });
  };
  
  const shareWithGuest = () => {
    // In a real app, this would send an email/SMS
    const contactInfo = contactMethod === "email" ? guestEmail : guestPhone;
    
    toast({
      title: `PIN shared via ${contactMethod.toUpperCase()}`,
      description: `Access details sent to ${contactInfo}`,
    });
    
    // Add to access log
    setAccessLog(prev => [
      { 
        time: new Date(), 
        action: `PIN shared via ${contactMethod} to ${contactInfo}`
      },
      ...prev
    ]);
  };
  
  const revokeAccess = () => {
    toast({
      title: "Access revoked",
      description: `Guest access for ${guestName} has been revoked`,
    });
    
    // Add to access log
    setAccessLog(prev => [
      { 
        time: new Date(), 
        action: `Access revoked for ${guestName}`
      },
      ...prev
    ]);
    
    // Clear the generated pin
    setGeneratedPin("");
  };
  
  return (
    <div className="py-4 space-y-6">
      {!generatedPin ? (
        <FormSection 
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
        <ResultsSection
          guestName={guestName}
          generatedPin={generatedPin}
          propertyName={propertyName}
          accessEndTime={accessEndTime}
          accessLog={accessLog}
          contactMethod={contactMethod}
          copyGuestPinToClipboard={copyGuestPinToClipboard}
          shareWithGuest={shareWithGuest}
          revokeAccess={revokeAccess}
        />
      )}
    </div>
  );
}

// Form Section Component
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

function FormSection({
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

// Results Section Component
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

function ResultsSection({
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
