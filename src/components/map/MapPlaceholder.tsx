
import React from 'react';
import { Property } from '../PropertyCard';
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface MapPlaceholderProps {
  properties: Property[];
  onPropertyClick: (propertyId: string) => void;
}

export function MapPlaceholder({ properties, onPropertyClick }: MapPlaceholderProps) {
  return (
    <div className="text-center space-y-4 relative z-10 p-8 max-w-lg">
      <h3 className="text-xl font-medium">OpenStreetMap Integration</h3>
      <p className="text-muted-foreground text-sm">Loading map or displaying fallback if the map couldn't be loaded.</p>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {properties.slice(0, 6).map((property, index) => (
          <motion.div 
            key={property.id}
            className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onPropertyClick(property.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={16} className="text-brand-red" />
              <span className="text-xs font-medium truncate">{property.name}</span>
            </div>
            <div className="text-xs text-muted-foreground">${property.price}/night</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default MapPlaceholder;
