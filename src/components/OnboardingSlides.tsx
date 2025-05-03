
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface OnboardingSlide {
  title: string;
  description: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    title: "Book smarter stays with BedFast.",
    description: "Discover properties with instant booking and smart lock access. No hosts, no hassle.",
    image: "/placeholder.svg",
  },
  {
    title: "Finding Properties Faster Than a Ride.",
    description: "Browse, book and unlock properties with just your phone. It's that simple.",
    image: "/placeholder.svg",
  }
];

const OnboardingSlides = ({ onComplete }: { onComplete: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <div className="h-screen w-full bg-background flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="relative w-full max-w-sm aspect-square mb-8">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent rounded-3xl" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12 px-6 flex flex-col items-center">
        <div className="flex space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-brand-red" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <Button 
          onClick={nextSlide} 
          className="w-full bg-brand-red text-white hover:bg-brand-red/90"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default OnboardingSlides;
