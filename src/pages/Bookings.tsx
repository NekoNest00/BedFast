
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { CalendarDays, LockKeyhole, X, Check, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { format, isBefore, isAfter } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge, { AccessStatus } from "../components/access/displays/StatusBadge";

type BookingStatus = "upcoming" | "past";

interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  accessCode: string;
  status: BookingStatus;
  cancellationAllowed?: boolean;
}

export default function Bookings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Mock bookings data - in a real app, this would come from an API
  const bookings: Booking[] = [
    {
      id: "booking1",
      propertyId: "prop1",
      propertyName: "Modern Downtown Apartment",
      location: "Downtown, New York",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      checkIn: "2025-05-10",
      checkOut: "2025-05-15",
      accessCode: "1234",
      status: "upcoming",
      cancellationAllowed: true,
    },
    {
      id: "booking2",
      propertyId: "prop2",
      propertyName: "Luxury Beach House",
      location: "Malibu, California",
      image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3",
      checkIn: "2025-06-15",
      checkOut: "2025-06-20",
      accessCode: "5678",
      status: "upcoming",
      cancellationAllowed: false,
    },
    {
      id: "booking3",
      propertyId: "prop3",
      propertyName: "Mountain View Cabin",
      location: "Aspen, Colorado",
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3",
      checkIn: "2025-04-01",
      checkOut: "2025-04-05",
      accessCode: "9012",
      status: "past",
      cancellationAllowed: false,
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const getAccessStatus = (booking: Booking): AccessStatus => {
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

  if (!user) {
    return (
      <Layout>
        <div className="container-app flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="flex flex-col items-center text-center max-w-xs">
            <CalendarDays size={48} className="text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
            <p className="text-muted-foreground mb-6">Sign in to view your bookings and access your stays</p>
            <button className="btn-primary w-full">Login</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-6">
        <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
        
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as "upcoming" | "past")}>
          <TabsList className="grid grid-cols-2 mb-8 w-full">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "upcoming")
              .map((booking) => {
                const accessStatus = getAccessStatus(booking);
                return (
                  <Card key={booking.id} className="overflow-hidden h-[120px]">
                    <Link to={`/access/${booking.id}`} className="flex h-full">
                      <div className="w-1/3 h-full flex-shrink-0">
                        <img
                          src={booking.image}
                          alt={booking.propertyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium line-clamp-1 text-sm">{booking.propertyName}</h3>
                            <div className="flex-shrink-0">
                              <StatusBadge accessStatus={accessStatus} />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{booking.location}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarDays size={12} className="mr-1 flex-shrink-0" />
                            <span className="truncate">
                              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-1 gap-2">
                          {accessStatus === "active" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild 
                              className="text-xs h-7 px-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link to={`/access/${booking.id}`} className="flex items-center gap-1">
                                <LockKeyhole size={12} />
                                View PIN
                              </Link>
                            </Button>
                          )}
                          
                          {booking.cancellationAllowed && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 ml-auto h-7 px-2"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Cancellation logic would go here
                                alert(`Booking ${booking.id} cancelled`);
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
              })}
              
              {bookings.filter(b => b.status === "upcoming").length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No upcoming bookings</p>
                </div>
              )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "past")
              .map((booking) => (
                <Card key={booking.id} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity h-[120px]">
                  <Link to={`/access/${booking.id}`} className="flex h-full">
                    <div className="w-1/3 h-full flex-shrink-0">
                      <img
                        src={booking.image}
                        alt={booking.propertyName}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                    <CardContent className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1 text-sm">{booking.propertyName}</h3>
                        <p className="text-xs text-muted-foreground mb-1 line-clamp-1">{booking.location}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays size={12} className="mr-1 flex-shrink-0" />
                          <span className="truncate">
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <Badge variant="outline" className="text-xs h-6 px-3">Completed</Badge>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7 px-2"
                        >
                          Write Review
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
              
              {bookings.filter(b => b.status === "past").length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No past bookings</p>
                </div>
              )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
