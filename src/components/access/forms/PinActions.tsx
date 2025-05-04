
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Send, Trash2 } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";

interface PinActionsProps {
  copyGuestPinToClipboard: () => void;
  shareWithGuest: () => void;
  revokeAccess: () => void;
  contactMethod: "email" | "sms";
}

export default function PinActions({ 
  copyGuestPinToClipboard, 
  shareWithGuest, 
  revokeAccess, 
  contactMethod 
}: PinActionsProps) {
  return (
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
  );
}
