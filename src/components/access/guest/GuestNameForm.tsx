
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";

interface GuestNameFormProps {
  guestName: string;
  setGuestName: (name: string) => void;
  guestEmail: string;
  setGuestEmail: (email: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  contactMethod: "email" | "sms";
  setContactMethod: (method: "email" | "sms") => void;
}

export default function GuestNameForm({
  guestName,
  setGuestName,
  guestEmail,
  setGuestEmail,
  guestPhone,
  setGuestPhone,
  contactMethod,
  setContactMethod,
}: GuestNameFormProps) {
  return (
    <>
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
    </>
  );
}
