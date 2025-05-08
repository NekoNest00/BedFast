
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GuestAccessForm from "./guest/GuestAccessForm";

interface AccessActionsProps {
  booking: {
    pin: string;
    propertyName: string;
    startDate: Date;
    endDate: Date;
  };
  isWithinAccessWindow: boolean;
}

export default function AccessActions({ booking, isWithinAccessWindow }: AccessActionsProps) {
  const { toast } = useToast();

  // Function to copy PIN to clipboard
  const copyPinToClipboard = () => {
    navigator.clipboard.writeText(booking.pin).then(() => {
      toast({
        title: "PIN Copied",
        description: "Access PIN copied to clipboard",
      });
    }, () => {
      toast({
        title: "Copy failed",
        description: "Please copy the PIN manually",
        variant: "destructive",
      });
    });
  };

  if (!isWithinAccessWindow) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <Button 
        variant="outline" 
        className="w-full"
        onClick={copyPinToClipboard}
      >
        <Copy className="mr-2 h-4 w-4" /> Copy PIN to Clipboard
      </Button>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <Users className="mr-2 h-4 w-4" /> Add Guest Access
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Guest Access</SheetTitle>
          </SheetHeader>
          <GuestAccessForm 
            propertyName={booking.propertyName} 
            startDate={booking.startDate}
            endDate={booking.endDate}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
