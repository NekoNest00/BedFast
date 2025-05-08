
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addHours } from "date-fns";

interface UseGuestAccessParams {
  propertyName: string;
  startDate: Date;
  endDate: Date;
}

export function useGuestAccess({ propertyName, startDate, endDate }: UseGuestAccessParams) {
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
  
  const copyPinToClipboard = () => {
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

  return {
    // State
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
    
    // Actions
    generateGuestPin,
    copyPinToClipboard,
    shareWithGuest,
    revokeAccess
  };
}
