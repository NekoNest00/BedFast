
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import BookingForm from "../components/BookingForm";
import BookingConfirmation from "../components/BookingConfirmation";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Component imports
import PropertyImageCarousel from "../components/property/PropertyImageCarousel";
import PropertyDetailsHeader from "../components/property/PropertyDetailsHeader";
import PropertyDescription from "../components/property/PropertyDescription";
import RecommendationCarousel from "../components/recommendations/RecommendationCarousel";
import ViewingScheduler from "../components/viewings/ViewingScheduler";
import { useRecommendations } from "../hooks/useRecommendations";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const initialAction = searchParams.get('action');
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");
  const [bookingDates, setBookingDates] = useState<{start?: Date, end?: Date}>({});
  const [activeTab, setActiveTab] = useState<"book" | "view">(initialAction === "view" ? "view" : "book");
  const { toast } = useToast();
  
  // Set initial tab based on search params when component mounts
  useEffect(() => {
    if (initialAction === "view") {
      setActiveTab("view");
    } else if (initialAction === "book") {
      setActiveTab("book");
    }
  }, [initialAction]);
  
  // Fetch recommendations based on property ID
  const { recommendations, isLoading } = useRecommendations(id);
  
  // Mock property details data - in a real app this would come from API
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
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586105251218-f870243fee9e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1645875061218-f870243fee9e?ixlib=rb-4.0.3",
    ],
    amenities: ["Wifi", "TV", "Kitchen", "Air conditioning", "Washer", "Dryer"],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    instant: true,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    accessType: "PIN-based",
    hostName: "Sarah",
    hostImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
  };

  // Handle booking completion
  const handleBookingComplete = (pin: string) => {
    setGeneratedPin(pin);
    setBookingComplete(true);
    toast({
      title: "Booking Successful!",
      description: "Your booking has been confirmed and a PIN has been generated.",
    });
  };

  // Handle favorite toggle
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your saved list" : "Property added to your saved list",
    });
  };

  // Handle share button click
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Property link copied to clipboard",
    });
  };

  return (
    <Layout>
      <div className="relative pb-16">
        {/* Property Images */}
        <PropertyImageCarousel 
          images={property.images} 
          propertyName={property.name} 
        />

        {/* Property Header */}
        <PropertyDetailsHeader
          property={property}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onShare={handleShare}
        />
        
        {/* Property Details */}
        <div className="container-app">
          <div className="lg:grid lg:grid-cols-3 gap-6 mt-4">
            {/* Left column - Property description */}
            <div className="lg:col-span-2">
              <PropertyDescription description={property.description} />
            </div>
            
            {/* Right column - Booking/Viewing tabs */}
            <div className="mt-6 lg:mt-0">
              <Tabs 
                defaultValue={activeTab} 
                value={activeTab} 
                onValueChange={(value) => setActiveTab(value as "book" | "view")} 
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="book">Book Stay</TabsTrigger>
                  <TabsTrigger value="view">Schedule Viewing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="book">
                  {bookingComplete ? (
                    <BookingConfirmation 
                      pin={generatedPin}
                      propertyName={property.name}
                      startDate={bookingDates.start}
                      endDate={bookingDates.end}
                    />
                  ) : (
                    <BookingForm
                      propertyId={property.id}
                      propertyName={property.name}
                      pricePerNight={property.price}
                      onBookingComplete={(pin) => {
                        handleBookingComplete(pin);
                      }}
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="view">
                  <ViewingScheduler 
                    propertyId={property.id}
                    propertyName={property.name}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* AI-Powered Recommendations */}
          {!isLoading && recommendations.length > 0 && (
            <RecommendationCarousel 
              recommendations={recommendations.find(rec => rec.type === 'similar') || recommendations[0]} 
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
