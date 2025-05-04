
import React from "react";
import { Wifi, Tv, Bath, Home } from "lucide-react";

interface PropertyDescriptionProps {
  description: string;
}

export default function PropertyDescription({
  description,
}: PropertyDescriptionProps) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">About this place</h2>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Amenities</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Wifi size={20} className="text-muted-foreground" />
            <span>Wifi</span>
          </div>
          <div className="flex items-center gap-3">
            <Tv size={20} className="text-muted-foreground" />
            <span>TV</span>
          </div>
          <div className="flex items-center gap-3">
            <Bath size={20} className="text-muted-foreground" />
            <span>Bath</span>
          </div>
          <div className="flex items-center gap-3">
            <Home size={20} className="text-muted-foreground" />
            <span>Kitchen</span>
          </div>
        </div>
      </div>
    </>
  );
}
