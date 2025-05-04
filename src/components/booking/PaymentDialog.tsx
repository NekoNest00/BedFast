
import React from "react";
import { format } from "date-fns";
import { CreditCard, Apple } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PaymentDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  total: number;
  onPayment: () => void;
  isProcessing: boolean;
  propertyName: string;
}

export default function PaymentDialog({
  isOpen,
  setIsOpen,
  startDate,
  endDate,
  total,
  onPayment,
  isProcessing,
  propertyName,
}: PaymentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription>
            Complete your booking for {propertyName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Date</span>
            <span>
              {startDate && endDate
                ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                : ''}
            </span>
          </div>
          
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
          
          <div className="space-y-2 pt-4">
            <h4 className="text-sm font-medium mb-2">Payment Method</h4>
            
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onPayment}
              >
                <CreditCard size={24} className="mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onPayment}
              >
                <Apple size={24} className="mb-1" />
                <span className="text-xs">Apple Pay</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20"
                onClick={onPayment}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-1"
                >
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor" />
                  <path d="M17.2 12.9V14.5H18V15.5H17.2V18H16V15.5H12V14.7L15.8 9.4H17.2V12.9ZM16 12.9V10.7L14 12.9H16Z" fill="white" />
                  <path d="M9.5 9C10.7 9 11.7 9.8 12 11H8.3C8.5 9.8 8.8 9 9.5 9ZM12.3 13C12.1 14.3 11.7 15 10.5 15C9.3 15 8.7 14.2 8.4 13H12.3ZM8.3 12H7C7 9.6 8 8 10 8C12 8 13 9.6 13 12C13 14.4 12 16 10 16C8 16 7 14.4 7 12H8.3Z" fill="white" />
                </svg>
                <span className="text-xs">Google Pay</span>
              </Button>
            </div>

            <div className="flex justify-center pt-4">
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-transparent border-blue-600"></div>
                  <span>Processing payment...</span>
                </div>
              ) : (
                <p className="text-xs text-center text-muted-foreground">
                  By completing this booking, you agree to the Terms of Service and Privacy Policy
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
