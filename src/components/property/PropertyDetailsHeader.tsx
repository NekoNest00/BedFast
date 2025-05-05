
import React from "react";
import { Share, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface PropertyDetailsHeaderProps {
  property: {
    name: string;
    location: string;
    rating: number;
    reviews: number;
    hostName: string;
    hostImage: string;
    instant: boolean;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}

const PropertyDetailsHeader = ({
  property,
  isFavorite,
  onToggleFavorite,
  onShare
}: PropertyDetailsHeaderProps) => {
  return (
    <div className="container-app pt-4">
      <motion.div 
        className="flex justify-between items-start"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.h1 
            className="text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {property.name}
          </motion.h1>
          
          <motion.div 
            className="flex items-center mt-1 space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm text-muted-foreground">{property.location}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="flex items-center">
              <span className="text-sm font-medium">{property.rating}</span>
              <span className="text-brand-red ml-1">★</span>
            </span>
            <span className="mx-1 text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{property.reviews} reviews</span>
            {property.instant && (
              <>
                <span className="mx-1 text-muted-foreground">·</span>
                <span className="text-xs bg-brand-red/10 text-brand-red px-2 py-0.5 rounded-full">
                  Instant Access
                </span>
              </>
            )}
          </motion.div>
        </div>
        
        <motion.div 
          className="flex space-x-2"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onShare} 
            className="rounded-full"
          >
            <Share className="h-4 w-4" />
          </Button>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={onToggleFavorite}
              className={`rounded-full ${isFavorite ? "text-brand-red" : ""}`}
            >
              <Heart 
                className={`h-4 w-4 ${isFavorite ? "fill-brand-red" : ""}`} 
              />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PropertyDetailsHeader;
