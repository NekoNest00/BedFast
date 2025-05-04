
import React from "react";
import { Map, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  viewMode: "map" | "list";
  onViewModeChange: (value: "map" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="mb-4 flex justify-center">
      <ToggleGroup 
        type="single" 
        value={viewMode} 
        onValueChange={(value) => value && onViewModeChange(value as "map" | "list")}
      >
        <ToggleGroupItem value="map" aria-label="Map View">
          <Map className="mr-2" size={16} />
          Map
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List View">
          <List className="mr-2" size={16} />
          List
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
