
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import BookingTabs, { Booking } from "../components/bookings/BookingTabs";
import EmptyState from "../components/bookings/EmptyState";

export default function Bookings() {
  const { user } = useAuth();
  
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

  const handleBookingCancel = (id: string) => {
    // Cancellation logic would go here
    alert(`Booking ${id} cancelled`);
  };

  if (!user) {
    return (
      <Layout>
        <EmptyState isLoggedIn={false} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-6">
        <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
        
        <BookingTabs 
          bookings={bookings}
          onBookingCancel={handleBookingCancel}
        />
      </div>
    </Layout>
  );
}
