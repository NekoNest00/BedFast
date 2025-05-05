
import React from "react";
import PropertyCard, { Property } from "../PropertyCard";
import PropertyCardSkeleton from "../PropertyCardSkeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PropertiesListViewProps {
  properties: Property[];
  isLoading?: boolean;
  onClearFilters?: () => void;
}

export default function PropertiesListView({ 
  properties, 
  isLoading = false,
  onClearFilters
}: PropertiesListViewProps) {
  // Display skeletons when loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {properties.map((property) => (
        <motion.div key={property.id} variants={item}>
          <PropertyCard property={property} />
        </motion.div>
      ))}
      
      {properties.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-2">No properties match your current filters</p>
          {onClearFilters && (
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="mt-2"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}
