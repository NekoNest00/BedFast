
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ViewingHelp() {
  return (
    <>
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Next Steps</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">View the property using your temporary PIN</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">Submit your feedback after the viewing</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">If interested, you can book the property from the main listing</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Need Help?</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Contact support:</strong>
          </p>
          <Button variant="link" className="h-auto p-0 text-sm" 
            onClick={() => window.location.href = "mailto:support@example.com"}>
            support@example.com
          </Button>
          <p>
            <strong>Emergency phone:</strong> (123) 456-7890
          </p>
        </div>
      </div>
    </>
  );
}
