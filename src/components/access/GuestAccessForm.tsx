
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { SheetClose } from "@/components/ui/sheet";
import { Copy, Check } from "lucide-react";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const { toast } = useToast();
  
  const generateGuestPin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!guestName.trim() || !guestEmail.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
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
    toast({
      title: "PIN shared",
      description: `Access details sent to ${guestEmail}`,
    });
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
          
          <div className="space-y-2">
            <Label htmlFor="guestEmail">Guest Email</Label>
            <Input 
              id="guestEmail"
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="Enter guest's email"
              required
            />
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
            <p className="text-xs text-muted-foreground">
              Valid from {format(startDate, "MMM d")} to {format(endDate, "MMM d")}
            </p>
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
              <Check className="mr-2 h-4 w-4" /> Share with Guest
            </Button>
            
            <SheetClose asChild>
              <Button variant="ghost" className="w-full">Done</Button>
            </SheetClose>
          </div>
        </div>
      )}
    </div>
  );
}
