
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

interface AccessSupportProps {
  supportEmail: string;
  supportPhone: string;
}

export default function AccessSupport({ supportEmail, supportPhone }: AccessSupportProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-medium mb-3">Need Help?</h3>
      <div className="space-y-2 text-sm">
        <p>
          <strong>Contact property manager:</strong>
        </p>
        <Button variant="link" className="h-auto p-0 text-sm" 
          onClick={() => window.location.href = `mailto:${supportEmail}`}>
          <HelpCircle size={14} className="mr-1" /> {supportEmail}
        </Button>
        <p>
          <strong>Emergency phone:</strong> {supportPhone}
        </p>
      </div>
    </div>
  );
}
