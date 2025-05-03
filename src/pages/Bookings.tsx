
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { CalendarDays, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function Bookings() {
  const { user } = useAuth();

  // Mock bookings data
  const bookings = [
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
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric'
    });
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

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
          <div className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "upcoming")
              .map((booking) => (
                <div key={booking.id} className="border rounded-xl overflow-hidden flex">
                  <div className="w-1/3 aspect-square">
                    <img
                      src={booking.image}
                      alt={booking.propertyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{booking.propertyName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{booking.location}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays size={14} className="mr-1" />
                        <span>
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        to={`/property/${booking.propertyId}`}
                        className="flex items-center text-xs text-primary"
                      >
                        <LockKeyhole size={14} className="mr-1" />
                        Access Property
                      </Link>
                      <button className="text-xs btn-outline py-1">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Past Stays</h2>
          <div className="space-y-4">
            {bookings
              .filter((booking) => booking.status === "past")
              .map((booking) => (
                <div key={booking.id} className="border rounded-xl overflow-hidden flex opacity-70">
                  <div className="w-1/3 aspect-square">
                    <img
                      src={booking.image}
                      alt={booking.propertyName}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{booking.propertyName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{booking.location}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays size={14} className="mr-1" />
                        <span>
                          {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Completed</span>
                      <button className="text-xs btn-outline py-1">Write Review</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
