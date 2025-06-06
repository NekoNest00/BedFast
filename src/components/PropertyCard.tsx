
import React from "react";
import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  return (
    <div className={cn("group animate-fade-in", className)}>
      <div className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3">
          <img 
            src={property.images[0]} 
            alt={property.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button 
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80 transition-colors"
            aria-label={`Save ${property.name} to favorites`}
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
              <span className="text-sm text-amber-500">★</span>
              <span className="text-sm font-medium">{property.rating}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{property.location}</p>
          <p className="text-sm font-medium">
            <span className="text-foreground">${property.price}</span>
            <span className="text-muted-foreground"> night</span>
          </p>
          
          <div className="flex gap-2 mt-3 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-1/2 bg-background text-foreground hover:bg-muted/30" 
              asChild
            >
              <Link to={`/property/${property.id}?action=view`} className="flex items-center justify-center">
                <Eye size={16} className="mr-1" />
                View now
              </Link>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="w-1/2 bg-brand-red hover:bg-brand-red/90" 
              asChild
            >
              <Link to={`/property/${property.id}?action=book`}>
                Book now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
