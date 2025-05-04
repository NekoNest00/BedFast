
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PropertyCard, { Property } from "../PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { RecommendationSet } from "@/hooks/useRecommendations";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "../ui/badge";

interface RecommendationCarouselProps {
  recommendations: RecommendationSet;
  variant?: "full" | "compact";
  className?: string;
}

export const RecommendationCarousel = ({
  recommendations,
  variant = "full",
  className = "",
}: RecommendationCarouselProps) => {
  const { toast } = useToast();
  const { title, description, properties } = recommendations;

  if (properties.length === 0) {
    return null;
  }

  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Badge variant="outline" className="bg-brand-red/10 text-brand-red border-brand-red/20">
              AI Powered
            </Badge>
          </div>
          {variant === "full" && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {properties.map((property) => (
            <CarouselItem 
              key={property.id} 
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-end gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0 h-9 w-9" />
          <CarouselNext className="static translate-y-0 h-9 w-9" />
        </div>
      </Carousel>
    </div>
  );
};

export default RecommendationCarousel;
