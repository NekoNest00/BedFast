
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format, addHours } from "date-fns";
import { SheetClose } from "@/components/ui/sheet";
import { Copy, Check, Clock, Mail, Send, Trash2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

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
    // For this demo, we'll just show a success message
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
    // In a real app, this would call an API to revoke the PIN
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
  
  const handleAccessHoursChange = (value: number[]) => {
    setAccessHours(value[0]);
  };
  
  return (
    <div className="py-4 space-y-6">
      {!generatedPin ? (
        <form onSubmit={generateGuestPin} className="space-y-4">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Create temporary access for guests during your stay at {propertyName}.
              Guest access is limited to your booking period from {format(startDate, "MMM d")} to {format(endDate, "MMM d")}.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="guestName">Guest Name</Label>
            <Input 
              id="guestName"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter guest's name"
              required
            />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contactMethod">Contact Method</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={contactMethod === "email" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setContactMethod("email")}
                >
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Button>
                <Button
                  type="button"
                  variant={contactMethod === "sms" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setContactMethod("sms")}
                >
                  <Send className="mr-2 h-4 w-4" /> SMS
                </Button>
              </div>
            </div>
            
            {contactMethod === "email" ? (
              <div className="space-y-2">
                <Label htmlFor="guestEmail">Guest Email</Label>
                <Input 
                  id="guestEmail"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="Enter guest's email"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="guestPhone">Guest Phone</Label>
                <Input 
                  id="guestPhone"
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="Enter guest's phone number"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="accessDuration">Access Duration</Label>
              <span className="text-sm text-muted-foreground">{accessHours} hours</span>
            </div>
            <Slider
              id="accessDuration"
              min={1}
              max={maxHours}
              step={1}
              value={[accessHours]}
              onValueChange={handleAccessHoursChange}
            />
            <p className="text-xs text-muted-foreground">
              Set how long the guest will have access (1-{maxHours} hours)
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Guest PIN"}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Guest Access Created</h4>
            <p className="text-sm text-muted-foreground">
              Access PIN for {guestName} has been generated
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-2">Guest PIN</p>
            <div className="flex gap-2 justify-center mb-3">
              {generatedPin.split('').map((digit, i) => (
                <div 
                  key={i} 
                  className="w-10 h-12 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-mono text-lg font-bold"
                >
                  {digit}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <p>
                Expires {format(accessEndTime, "MMM d, h:mm a")}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={copyGuestPinToClipboard}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy PIN to Clipboard
            </Button>
            
            <Button 
              className="w-full"
              onClick={shareWithGuest}
            >
              {contactMethod === "email" ? (
                <Mail className="mr-2 h-4 w-4" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Share with Guest via {contactMethod.toUpperCase()}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
              onClick={revokeAccess}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Revoke Access
            </Button>
            
            <SheetClose asChild>
              <Button variant="ghost" className="w-full">Done</Button>
            </SheetClose>
          </div>
          
          {accessLog.length > 0 && (
            <Card className="mt-4">
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium mb-2">Access Log</h4>
                <div className="space-y-2 text-xs text-muted-foreground max-h-28 overflow-y-auto">
                  {accessLog.map((entry, i) => (
                    <div key={i} className="flex justify-between py-1 border-b">
                      <span>{entry.action}</span>
                      <span>{format(entry.time, "h:mm a")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
