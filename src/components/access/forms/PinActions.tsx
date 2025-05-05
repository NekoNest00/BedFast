
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Send, Trash2, Share, Link } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";

interface PinActionsProps {
  copyGuestPinToClipboard: () => void;
  shareWithGuest: () => void;
  shareAccessLink?: () => void;
  revokeAccess: () => void;
  contactMethod: "email" | "sms";
  hasGeneratedLink?: boolean;
}

export default function PinActions({ 
  copyGuestPinToClipboard, 
  shareWithGuest, 
  shareAccessLink,
  revokeAccess, 
  contactMethod,
  hasGeneratedLink = false
}: PinActionsProps) {
  return (
    <motion.div 
      className="flex flex-col gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button 
        variant="outline" 
        className="w-full"
        onClick={copyGuestPinToClipboard}
      >
        <Copy className="mr-2 h-4 w-4" /> Copy PIN to Clipboard
      </Button>
      
      <Button 
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
        onClick={shareWithGuest}
      >
        {contactMethod === "email" ? (
          <Mail className="mr-2 h-4 w-4" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Share with Guest via {contactMethod.toUpperCase()}
      </Button>
      
      {shareAccessLink && (
        <Button 
          variant="outline"
          className="w-full"
          onClick={shareAccessLink}
        >
          {hasGeneratedLink ? (
            <>
              <Link className="mr-2 h-4 w-4" /> Copy Access Link
            </>
          ) : (
            <>
              <Share className="mr-2 h-4 w-4" /> Generate Access Link
            </>
          )}
        </Button>
      )}
      
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
    </motion.div>
  );
}
