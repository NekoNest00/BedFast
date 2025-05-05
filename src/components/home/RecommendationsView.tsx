
import React from "react";
import PropertyCard from "../PropertyCard";
import PropertyCardSkeleton from "../PropertyCardSkeleton";
import { RecommendationSet } from "@/hooks/useRecommendations";
import { motion } from "framer-motion";

interface RecommendationsViewProps {
  recommendationSet: RecommendationSet | undefined;
  isLoading?: boolean;
}

export default function RecommendationsView({ recommendationSet, isLoading = false }: RecommendationsViewProps) {
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="mb-4">
          <div className="h-7 w-48 bg-muted rounded-md animate-pulse mb-2"></div>
          <div className="h-5 w-full max-w-md bg-muted/60 rounded-md animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!recommendationSet) return null;

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className="text-lg font-semibold mb-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {recommendationSet.title}
      </motion.h3>
      <motion.p 
        className="text-sm text-muted-foreground mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {recommendationSet.description}
      </motion.p>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.4
            }
          }
        }}
      >
        {recommendationSet.properties.map(property => (
          <motion.div 
            key={property.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
