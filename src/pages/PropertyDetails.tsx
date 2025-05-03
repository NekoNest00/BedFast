
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import SmartLockInterface from "../components/SmartLockInterface";
import { 
  ArrowLeft, 
  Heart, 
  Share, 
  MapPin, 
  Star,
  Wifi,
  Tv,
  Bath,
  Home,
  CalendarDays,
} from "lucide-react";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [isBooked, setIsBooked] = useState(false);
  
  // Mock property details data
  const property = {
    id: id || "prop1",
    name: "Modern Downtown Apartment",
    location: "Downtown, New York",
    price: 149,
    rating: 4.92,
    reviews: 128,
    description: "This stunning apartment features floor-to-ceiling windows with amazing city views, modern furnishings, and all the amenities you need for a comfortable stay.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3"
    ],
    amenities: ["Wifi", "TV", "Kitchen", "Air conditioning", "Washer", "Dryer"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    instant: true,
  };

  // Mock booking function
  const handleBooking = () => {
    // In a real app, this would call the booking API
    setTimeout(() => {
      setIsBooked(true);
    }, 1000);
  };

  return (
    <Layout>
      <div className="relative">
        {/* Property Images */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Link 
              to="/"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-black/60"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </Link>
            <div className="flex gap-2">
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-black/60"
                aria-label="Share"
              >
                <Share size={20} className="text-foreground" />
              </button>
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 dark:bg-black/60"
                aria-label="Save to favorites"
              >
                <Heart size={20} className="text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="container-app">
          <div className="py-4">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <div className="flex items-center">
                <Star size={16} className="text-brand-red mr-1" />
                <span>{property.rating}</span>
                <span className="mx-1">·</span>
                <span className="underline">{property.reviews} reviews</span>
              </div>
              <span className="mx-1">·</span>
              <div className="flex items-center text-muted-foreground">
                <MapPin size={14} className="mr-1" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="mt-4 p-4 border rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-semibold">${property.price}</span>
                  <span className="text-muted-foreground"> night</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">{property.bedrooms} beds</span>
                  <span>·</span>
                  <span className="text-sm">{property.bathrooms} bath</span>
                </div>
              </div>
              
              {!isBooked ? (
                <button 
                  onClick={handleBooking} 
                  className="btn-primary w-full mt-4"
                >
                  Book Instantly
                </button>
              ) : (
                <SmartLockInterface 
                  propertyId={property.id} 
                  propertyName={property.name} 
                />
              )}
            </div>

            {/* Property Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">About this place</h2>
              <p className="text-muted-foreground text-sm">
                {property.description}
              </p>
            </div>

            {/* Property Amenities */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Wifi size={20} className="text-muted-foreground" />
                  <span>Wifi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tv size={20} className="text-muted-foreground" />
                  <span>TV</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath size={20} className="text-muted-foreground" />
                  <span>Bath</span>
                </div>
                <div className="flex items-center gap-3">
                  <Home size={20} className="text-muted-foreground" />
                  <span>Kitchen</span>
                </div>
              </div>
            </div>

            {/* Calendar Availability */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Availability</h2>
              <div className="border rounded-xl p-4 flex justify-center items-center h-40">
                <div className="flex flex-col items-center text-muted-foreground">
                  <CalendarDays size={24} />
                  <p className="mt-2 text-sm">Check the calendar for available dates</p>
                  <button className="mt-2 btn-outline text-xs py-2">View Calendar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
