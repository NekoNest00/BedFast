
import React from "react";
import { Property } from "./PropertyCard";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GoogleMapsPlaceholderProps {
  properties: Property[];
}

export default function GoogleMapsPlaceholder({ properties }: GoogleMapsPlaceholderProps) {
  const navigate = useNavigate();

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-xl overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzNzM3MzciIGZpbGwtb3BhY2l0eT0iMC4wNyI+PHBhdGggZD0iTTM2IDM0djI2aDI0VjM0SDM2ek0wIDM0djI2aDI0VjM0SDB6TTM2IDBoLTJ2MjRoMjZWMEgzNnptLTEwIDB2MjRoMjRWMEgyNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
      
      <div className="text-center space-y-4 relative z-10 p-8 max-w-lg">
        <h3 className="text-xl font-medium">Google Maps Integration</h3>
        <p className="text-muted-foreground text-sm">This is a placeholder for Google Maps integration. In the final app, an interactive map would be displayed here with property markers.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
          {properties.slice(0, 6).map((property) => (
            <div 
              key={property.id}
              className="bg-background border border-border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePropertyClick(property.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-brand-red" />
                <span className="text-xs font-medium truncate">{property.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">${property.price}/night</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
