
import React from "react";
import { format } from "date-fns";
import { Check, Clock, Pin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingConfirmationProps {
  pin: string;
  propertyName: string;
  startDate?: Date;
  endDate?: Date;
}

export default function BookingConfirmation({ 
  pin, 
  propertyName,
  startDate,
  endDate
}: BookingConfirmationProps) {
  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;
    }
    return "Your selected dates";
  };
  
  // Simulated access window - in a real app this would be calculated based on the booking
  const accessWindowStart = startDate ? format(startDate, 'h:mm a') : '3:00 PM';
  const accessWindowEnd = endDate ? format(endDate, 'h:mm a') : '11:00 AM';

  return (
    <Card className="w-full border shadow-md bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      <CardHeader className="pb-2 text-center">
        <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <Check size={24} className="text-green-600" />
        </div>
        <CardTitle>Booking Confirmed!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="space-y-1">
          <h3 className="font-medium text-muted-foreground">Your Stay at</h3>
          <p className="font-semibold text-lg">{propertyName}</p>
          <p className="text-sm">{formatDateRange()}</p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-inner mx-auto max-w-xs">
          <div className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <Pin size={20} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-medium">Your Access PIN</h3>
            <div className="flex gap-2">
              {pin.split('').map((digit, i) => (
                <div 
                  key={i} 
                  className="w-10 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-mono text-xl font-bold"
                >
                  {digit}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Use this PIN to access the property during your stay
            </p>
          </div>
        </div>

        <div className="space-y-2 max-w-xs mx-auto">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-medium">Access Window</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your PIN will activate on the check-in date at {accessWindowStart} and deactivate on the check-out date at {accessWindowEnd}.
          </p>
        </div>
        
        <div className="pt-2">
          <Button variant="outline" onClick={() => window.print()}>
            Download Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
