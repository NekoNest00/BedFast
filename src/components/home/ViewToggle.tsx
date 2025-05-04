
import React, { useState } from "react";
import { Map, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";

interface ViewToggleProps {
  viewMode: "map" | "list";
  onViewModeChange: (value: "map" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-2">
        <ToggleGroup 
          type="single" 
          value={viewMode} 
          onValueChange={(value) => value && onViewModeChange(value as "map" | "list")}
          className="bg-muted/80 rounded-full p-1"
        >
          <ToggleGroupItem 
            value="map" 
            aria-label="Map View" 
            className="rounded-full text-xs py-1 px-3 data-[state=on]:bg-brand-red data-[state=on]:text-white"
          >
            <Map className="mr-1" size={14} />
            Map
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="list" 
            aria-label="List View" 
            className="rounded-full text-xs py-1 px-3 data-[state=on]:bg-brand-red data-[state=on]:text-white"
          >
            <List className="mr-1" size={14} />
            List
          </ToggleGroupItem>
        </ToggleGroup>

        <Input
          type="text"
          placeholder="Search properties..."
          className="w-full max-w-xs h-8 text-xs rounded-full border-muted-foreground/20 focus-visible:ring-brand-red"
          onClick={() => setShowSearchBar(true)}
        />
      </div>
    </div>
  );
}
