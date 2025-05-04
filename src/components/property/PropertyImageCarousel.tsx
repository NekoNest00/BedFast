
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PropertyImageCarouselProps {
  images: string[];
  propertyName: string;
}

export default function PropertyImageCarousel({ 
  images, 
  propertyName 
}: PropertyImageCarouselProps) {
  return (
    <div className="relative mb-4">
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={image}
                  alt={`${propertyName} - photo ${index + 1}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 bg-background/80" />
        <CarouselNext className="right-2 bg-background/80" />
      </Carousel>
    </div>
  );
}
