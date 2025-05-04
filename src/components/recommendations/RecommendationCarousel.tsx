
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/components/PropertyCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecommendationCarouselProps {
  title: string;
  properties: Property[];
  description?: string;
  maxItems?: number;
  className?: string;
}

export default function RecommendationCarousel({
  title,
  properties,
  description,
  maxItems = 6,
  className = "",
}: RecommendationCarouselProps) {
  const displayProperties = properties.slice(0, maxItems);

  if (displayProperties.length === 0) {
    return null;
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {displayProperties.map((property) => (
            <CarouselItem key={property.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="overflow-hidden rounded-xl">
                <Link to={`/property/${property.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {property.instant && (
                      <div className="absolute bottom-3 left-3 bg-brand-red text-white text-xs font-medium py-1 px-3 rounded-full">
                        Instant Access
                      </div>
                    )}
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">{property.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-amber-500" />
                        <span className="text-xs font-medium">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{property.location}</p>
                    <p className="text-sm font-medium">
                      <span>${property.price}</span>
                      <span className="text-muted-foreground text-xs"> night</span>
                    </p>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
