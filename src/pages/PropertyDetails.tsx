
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
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
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
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3",
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

  // Mock related properties
  const relatedProperties = [
    {
      id: "prop2",
      name: "Luxury Loft with City View",
      price: 189,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
      rating: 4.85,
      instant: true,
    },
    {
      id: "prop3",
      name: "Cozy Studio in Downtown",
      price: 120,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
      rating: 4.76,
      instant: false,
    },
    {
      id: "prop4",
      name: "Modern Apartment with View",
      price: 160,
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3",
      rating: 4.89,
      instant: true,
    },
  ];

  // Mock booking function
  const handleBooking = () => {
    // In a real app, this would call the booking API
    toast({
      title: "Booking initiated",
      description: "Processing your reservation...",
    });
    
    setTimeout(() => {
      setIsBooked(true);
    }, 1500);
  };

  const handleScheduleViewing = () => {
    toast({
      title: "Viewing Scheduled",
      description: "Check your email for confirmation details.",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your saved list" : "Property added to your saved list",
    });
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Property link copied to clipboard",
    });
  };

  return (
    <Layout>
      <div className="relative pb-16">
        {/* Property Images Carousel */}
        <div className="relative mb-4">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={image}
                      alt={`${property.name} - photo ${index + 1}`}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-background/80" />
            <CarouselNext className="right-2 bg-background/80" />
          </Carousel>

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <Link
              to="/"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </Link>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
                aria-label="Share"
              >
                <Share size={20} className="text-foreground" />
              </button>
              <button
                onClick={toggleFavorite}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
                aria-label="Save to favorites"
              >
                <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-foreground"} />
              </button>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="container-app">
          <div className="py-2">
            <h1 className="text-xl font-bold mb-1">{property.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center">
                <Star size={16} className="text-amber-500 mr-1" />
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

            {/* Host info */}
            <div className="flex items-center mt-3">
              <Avatar className="h-8 w-8 mr-2 border-2 border-background">
                <AvatarImage src={property.hostImage} alt={property.hostName} />
                <AvatarFallback>{property.hostName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">Hosted by {property.hostName}</span>
            </div>

            {/* Access Type Badge */}
            <div className="mt-3">
              <Badge variant="outline" className="bg-muted/50">
                {property.accessType} Access
              </Badge>
            </div>

            {/* Availability Info */}
            <div className="mt-4 flex gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={15} className="mr-1" />
                <span>Check-in: {property.checkIn}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={15} className="mr-1" />
                <span>Check-out: {property.checkOut}</span>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="mt-4 p-4 border rounded-xl bg-card">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-xl font-semibold">${property.price}</span>
                  <span className="text-muted-foreground"> night</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm flex items-center">
                    <Star size={14} className="text-amber-500 mr-1" />
                    {property.rating}
                  </span>
                  <span className="text-sm flex items-center gap-1">
                    <Home size={14} />
                    {property.bedrooms}
                  </span>
                  <span className="text-sm flex items-center gap-1">
                    <Bath size={14} />
                    {property.bathrooms}
                  </span>
                </div>
              </div>
              
              {!isBooked ? (
                <div className="space-y-3">
                  <Button 
                    onClick={handleBooking} 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md"
                  >
                    Book Now
                  </Button>
                  <Button 
                    onClick={handleScheduleViewing} 
                    variant="outline"
                    className="w-full"
                  >
                    <CalendarDays size={16} className="mr-2" />
                    Schedule a Viewing
                  </Button>
                </div>
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

            {/* AI-powered Related Properties */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-3">AI-Powered Suggestions</h2>
              <Alert className="mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-indigo-100 dark:from-indigo-950/30 dark:to-purple-950/30 dark:border-indigo-900/50">
                <AlertDescription className="text-sm">
                  Based on your preferences, we think you'll also love these properties.
                </AlertDescription>
              </Alert>
              
              <div className="overflow-x-auto pb-2 -mx-4 px-4">
                <div className="flex gap-4">
                  {relatedProperties.map((relatedProp) => (
                    <Card key={relatedProp.id} className="min-w-[240px] max-w-[240px]">
                      <Link to={`/property/${relatedProp.id}`}>
                        <AspectRatio ratio={4/3} className="bg-muted">
                          <img
                            src={relatedProp.image}
                            alt={relatedProp.name}
                            className="h-full w-full object-cover rounded-t-lg"
                          />
                        </AspectRatio>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="font-medium text-sm truncate">{relatedProp.name}</h3>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-sm font-semibold">${relatedProp.price}</span>
                                <span className="text-xs text-muted-foreground">night</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star size={14} className="text-amber-500" />
                              <span className="text-xs ml-1">{relatedProp.rating}</span>
                            </div>
                          </div>
                          {relatedProp.instant && (
                            <Badge variant="outline" className="mt-2 text-xs bg-brand-red/10 text-brand-red border-brand-red/20">
                              Instant Access
                            </Badge>
                          )}
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
