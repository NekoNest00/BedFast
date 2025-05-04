import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

interface PaymentMethodsTabProps {
  handleRemovePaymentMethod: () => void;
  handleAddPaymentMethod: () => void;
}

export default function PaymentMethodsTab({
  handleRemovePaymentMethod,
  handleAddPaymentMethod,
}: PaymentMethodsTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Methods</h2>
        <p className="text-muted-foreground">
          Manage your payment methods for booking properties
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        {/* Existing Payment Methods */}
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                VISA
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 04/25</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRemovePaymentMethod}
            >
              Remove
            </Button>
          </div>
        </div>
        
        {/* Add Payment Method */}
        <Button onClick={handleAddPaymentMethod} className="w-full">
          <CreditCard className="mr-2" size={18} />
          Add Payment Method
        </Button>
      </div>
    </div>
  );
}
