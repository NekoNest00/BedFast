
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Share, MapPin, Star, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PropertyDetailsHeaderProps {
  property: {
    name: string;
    location: string;
    rating: number;
    reviews: number;
    accessType: string;
    checkIn: string;
    checkOut: string;
    hostName: string;
    hostImage: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

export default function PropertyDetailsHeader({
  property,
  isFavorite,
  onToggleFavorite,
  onShare,
}: PropertyDetailsHeaderProps) {
  return (
    <>
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <Link
          to="/"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div className="flex gap-2">
          <button
            onClick={onShare}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
            aria-label="Share"
          >
            <Share size={20} className="text-foreground" />
          </button>
          <button
            onClick={onToggleFavorite}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-background/90 shadow-md"
            aria-label="Save to favorites"
          >
            <Heart size={20} className={isFavorite ? "text-red-500 fill-red-500" : "text-foreground"} />
          </button>
        </div>
      </div>

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
      </div>
    </>
  );
}
