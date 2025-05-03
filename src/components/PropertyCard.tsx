
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  instant: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group animate-fade-in">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button 
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/60"
            aria-label="Save to favorites"
          >
            <Heart size={18} className="text-foreground" />
          </button>
          {property.instant && (
            <div className="absolute bottom-3 left-3 bg-brand-red text-white text-xs font-medium py-1 px-3 rounded-full">
              Instant Access
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">{property.name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm">★</span>
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{property.location}</p>
          <p className="text-sm font-medium">
            <span className="text-foreground">${property.price}</span>
            <span className="text-muted-foreground"> night</span>
          </p>
        </div>
      </Link>
    </div>
  );
}
