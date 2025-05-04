
import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { format, addDays, differenceInDays } from "date-fns";
import { CalendarDays, CreditCard, Apple, Check } from "lucide-react";

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
  pricePerNight: number;
  onBookingComplete: (pin: string) => void;
}

export default function BookingForm({
  propertyId,
  propertyName,
  pricePerNight,
  onBookingComplete,
}: BookingFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [nights, setNights] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);

  // Update calculations when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const nightsCount = differenceInDays(endDate, startDate);
      if (nightsCount <= 0) return;
      
      setNights(nightsCount);
      const nightsTotal = nightsCount * pricePerNight;
      setSubtotal(nightsTotal);
      setCleaningFee(Math.round(nightsTotal * 0.1)); // 10% cleaning fee
      setServiceFee(Math.round(nightsTotal * 0.15)); // 15% service fee
      setTotal(nightsTotal + cleaningFee + serviceFee);
    }
  }, [startDate, endDate, pricePerNight]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      if (date && date > startDate) {
        setEndDate(date);
        setIsDatePickerOpen(false);
      } else {
        setStartDate(date);
        setEndDate(undefined);
      }
    }
  };

  const handleBookNow = () => {
    if (startDate && endDate) {
      setIsPaymentDialogOpen(true);
    }
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsPaymentDialogOpen(false);
      
      // Generate a PIN - in a real app, this would come from the backend
      const pin = Math.floor(1000 + Math.random() * 9000).toString();
      onBookingComplete(pin);
    }, 2000);
  };

  return (
    <>
      <Card className="w-full border shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xl font-semibold">${pricePerNight}</span>
              <span className="text-muted-foreground"> night</span>
            </div>
            {startDate && endDate && (
              <div className="text-sm">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </div>
            )}
          </div>

          <div 
            className="border rounded-lg p-3 flex justify-between items-center cursor-pointer mb-4"
            onClick={() => setIsDatePickerOpen(true)}
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Dates</span>
              <span className="text-sm text-muted-foreground">
                {startDate && endDate
                  ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
                  : 'Select dates'}
              </span>
            </div>
            <CalendarDays size={18} className="text-muted-foreground" />
          </div>

          {startDate && endDate && (
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>${pricePerNight} x {nights} nights</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>${cleaningFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>${serviceFee}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleBookNow}
            disabled={!startDate || !endDate}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>

      {/* Date picker dialog */}
      <Dialog open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select your stay dates</DialogTitle>
            <DialogDescription>
              Choose check-in and check-out dates for your stay at {propertyName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="range"
              selected={{
                from: startDate,
                to: endDate,
              }}
              onSelect={(range) => {
                if (range?.from) setStartDate(range.from);
                if (range?.to) setEndDate(range.to);
              }}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              className="pointer-events-auto"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => startDate && endDate && setIsDatePickerOpen(false)}>
              Confirm Dates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
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
                  onClick={handlePayment}
                >
                  <CreditCard size={24} className="mb-1" />
                  <span className="text-xs">Card</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20"
                  onClick={handlePayment}
                >
                  <Apple size={24} className="mb-1" />
                  <span className="text-xs">Apple Pay</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-20"
                  onClick={handlePayment}
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
                {isProcessingPayment ? (
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
    </>
  );
}
