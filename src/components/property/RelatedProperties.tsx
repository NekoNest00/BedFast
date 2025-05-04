
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

interface RelatedProperty {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  instant: boolean;
}

interface RelatedPropertiesProps {
  properties: RelatedProperty[];
}

export default function RelatedProperties({ properties }: RelatedPropertiesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-3">AI-Powered Suggestions</h2>
      <Alert className="mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-indigo-100 dark:from-indigo-950/30 dark:to-purple-950/30 dark:border-indigo-900/50">
        <AlertDescription className="text-sm">
          Based on your preferences, we think you'll also love these properties.
        </AlertDescription>
      </Alert>
      
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-4">
          {properties.map((property) => (
            <Card key={property.id} className="min-w-[240px] max-w-[240px]">
              <Link to={`/property/${property.id}`}>
                <AspectRatio ratio={4/3} className="bg-muted">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover rounded-t-lg"
                  />
                </AspectRatio>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-sm truncate">{property.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-sm font-semibold">${property.price}</span>
                        <span className="text-xs text-muted-foreground">night</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star size={14} className="text-amber-500" />
                      <span className="text-xs ml-1">{property.rating}</span>
                    </div>
                  </div>
                  {property.instant && (
                    <Badge variant="outline" className="mt-2 text-xs bg-brand-red/10 text-brand-red border-brand-red/20">
                      Instant Access
                    </Badge>
                  )}
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
