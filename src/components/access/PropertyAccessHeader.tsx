
import React from "react";
import { format } from "date-fns";

interface PropertyAccessHeaderProps {
  booking: {
    propertyName: string;
    propertyAddress: string;
    propertyImage: string;
    startDate: Date;
    endDate: Date;
    checkInTime: string;
    checkOutTime: string;
  };
}

export default function PropertyAccessHeader({ booking }: PropertyAccessHeaderProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
      <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
        <img 
          src={booking.propertyImage} 
          alt={booking.propertyName}
          className="w-full h-40 object-cover"
        />
      </div>
      
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-1">{booking.propertyName}</h1>
        <p className="text-muted-foreground mb-3">{booking.propertyAddress}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Check-in</p>
            <p className="font-medium">{format(booking.startDate, "MMM d, yyyy")} at {booking.checkInTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Check-out</p>
            <p className="font-medium">{format(booking.endDate, "MMM d, yyyy")} at {booking.checkOutTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
