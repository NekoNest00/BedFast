
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookingCard from "./BookingCard";
import { AccessStatus } from "../access/displays/StatusBadge";
import { isBefore, isAfter } from "date-fns";

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  accessCode: string;
  status: "upcoming" | "past";
  cancellationAllowed?: boolean;
}

interface BookingTabsProps {
  bookings: Booking[];
  onBookingCancel: (id: string) => void;
}

export const getAccessStatus = (booking: Booking): AccessStatus => {
  const now = new Date();
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  
  if (isAfter(now, checkIn) && isBefore(now, checkOut)) {
    return "active";
  } else if (isBefore(now, checkIn)) {
    return "upcoming";
  } else {
    return "expired";
  }
};

export default function BookingTabs({ bookings, onBookingCancel }: BookingTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");
  
  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming");
  const pastBookings = bookings.filter((booking) => booking.status === "past");

  return (
    <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "upcoming" | "past")}>
      <TabsList className="grid grid-cols-2 mb-8 w-full">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="space-y-4">
        {upcomingBookings.map((booking) => {
          const accessStatus = getAccessStatus(booking);
          return (
            <BookingCard
              key={booking.id}
              id={booking.id}
              propertyId={booking.propertyId}
              propertyName={booking.propertyName}
              location={booking.location}
              image={booking.image}
              checkIn={booking.checkIn}
              checkOut={booking.checkOut}
              accessCode={booking.accessCode}
              isPast={false}
              accessStatus={accessStatus}
              cancellationAllowed={booking.cancellationAllowed}
              onCancel={onBookingCancel}
            />
          );
        })}
        
        {upcomingBookings.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No upcoming bookings</p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="past" className="space-y-4">
        {pastBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            id={booking.id}
            propertyId={booking.propertyId}
            propertyName={booking.propertyName}
            location={booking.location}
            image={booking.image}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            accessCode={booking.accessCode}
            isPast={true}
            accessStatus="expired"
            onCancel={onBookingCancel}
          />
        ))}
        
        {pastBookings.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No past bookings</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
