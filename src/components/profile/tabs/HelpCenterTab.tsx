
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HelpCenterTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Help Center</h2>
        <p className="text-muted-foreground">
          Find answers to common questions and get support
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Frequently Asked Questions</h3>
          <div className="rounded-lg border p-4 space-y-4">
            <div>
              <h4 className="font-medium">How do I access my property?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Your access code will be available in the app 1 hour before check-in time.
              </p>
            </div>
            <div>
              <h4 className="font-medium">What is the cancellation policy?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Cancellation policies vary by property. Check the specific property details.
              </p>
            </div>
            <div>
              <h4 className="font-medium">How do I contact support?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                You can reach our support team via email at support@bedfast.com or through the in-app support chat.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-muted p-6 text-center">
          <h3 className="font-medium mb-2">Still need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <Button>Contact Support</Button>
        </div>
      </div>
    </div>
  );
}
