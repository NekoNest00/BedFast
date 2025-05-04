
import React, { useState } from "react";
import { Map, List, Search } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";

interface ViewToggleProps {
  viewMode: "map" | "list";
  onViewModeChange: (value: "map" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  
  return (
    <div className="mb-4 space-y-3">
      <div className="flex items-center justify-between">
        <ToggleGroup 
          type="single" 
          value={viewMode} 
          onValueChange={(value) => value && onViewModeChange(value as "map" | "list")}
          className="bg-muted/80 rounded-full p-1"
        >
          <ToggleGroupItem value="map" aria-label="Map View" className="rounded-full">
            <Map className="mr-2" size={16} />
            Map
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List View" className="rounded-full">
            <List className="mr-2" size={16} />
            List
          </ToggleGroupItem>
        </ToggleGroup>

        <button 
          onClick={() => setShowSearchBar(!showSearchBar)}
          className="bg-background rounded-full p-2 shadow-sm border flex items-center justify-center"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Animated search bar */}
      {showSearchBar && (
        <div 
          className="animate-fade-in w-full"
        >
          <Input
            type="text"
            placeholder="Search properties..."
            className="w-full rounded-full border-muted-foreground/20"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
