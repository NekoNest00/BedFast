
import React, { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Import our new components
import DateSelector from "./booking/DateSelector";
import PriceSummary from "./booking/PriceSummary";
import PaymentDialog from "./booking/PaymentDialog";

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

  const handleDateSelect = (range: { from: Date; to: Date | undefined }) => {
    setStartDate(range.from);
    setEndDate(range.to);
    if (range.from && range.to) {
      setIsDatePickerOpen(false);
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

          <DateSelector 
            startDate={startDate}
            endDate={endDate}
            isOpen={isDatePickerOpen}
            setIsOpen={setIsDatePickerOpen}
            onDateSelect={handleDateSelect}
            propertyName={propertyName}
          />

          {startDate && endDate && (
            <PriceSummary
              nights={nights}
              pricePerNight={pricePerNight}
              subtotal={subtotal}
              cleaningFee={cleaningFee}
              serviceFee={serviceFee}
              total={total}
            />
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

      <PaymentDialog
        isOpen={isPaymentDialogOpen}
        setIsOpen={setIsPaymentDialogOpen}
        startDate={startDate}
        endDate={endDate}
        total={total}
        onPayment={handlePayment}
        isProcessing={isProcessingPayment}
        propertyName={propertyName}
      />
    </>
  );
}
