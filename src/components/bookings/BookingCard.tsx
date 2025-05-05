
import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, LockKeyhole } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge, { AccessStatus } from "../access/displays/StatusBadge";
import { Badge } from "@/components/ui/badge";

export interface BookingCardProps {
  id: string;
  propertyId: string;
  propertyName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  accessCode: string;
  isPast?: boolean;
  accessStatus: AccessStatus;
  cancellationAllowed?: boolean;
  onCancel?: (id: string) => void;
}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short', 
    day: 'numeric'
  });
};

export default function BookingCard({
  id,
  propertyName,
  location,
  image,
  checkIn,
  checkOut,
  isPast = false,
  accessStatus,
  cancellationAllowed = false,
  onCancel
}: BookingCardProps) {
  // Consistent icon size
  const iconSize = 12;
  
  return (
    <Card key={id} className="overflow-hidden h-[120px]">
      <Link to={`/access/${id}`} className="flex h-full">
        <div className="w-1/3 h-full flex-shrink-0">
          <img
            src={image}
            alt={propertyName}
            className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`}
          />
        </div>
        <CardContent className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium line-clamp-1 text-sm">{propertyName}</h3>
              <div className="flex-shrink-0">
                {isPast ? (
                  <Badge variant="outline" className="text-xs h-6 px-3 w-[110px] flex items-center justify-center">
                    Completed
                  </Badge>
                ) : (
                  <StatusBadge accessStatus={accessStatus} />
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{location}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarDays size={iconSize} className="mr-1 flex-shrink-0" />
              <span className="truncate">
                {formatDate(checkIn)} - {formatDate(checkOut)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1 gap-2">
            {accessStatus === "active" && !isPast && (
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="text-xs h-7 px-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Link to={`/access/${id}`} className="flex items-center gap-1">
                  <LockKeyhole size={iconSize} className="flex-shrink-0" />
                  View PIN
                </Link>
              </Button>
            )}
            
            {isPast && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7 px-2"
              >
                Write Review
              </Button>
            )}
            
            {cancellationAllowed && !isPast && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 ml-auto h-7 px-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onCancel) {
                    onCancel(id);
                  }
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
