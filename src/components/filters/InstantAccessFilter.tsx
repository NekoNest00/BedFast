
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface InstantAccessFilterProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function InstantAccessFilter({ 
  checked, 
  onCheckedChange 
}: InstantAccessFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="instant-access"
          checked={checked}
          onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        />
        <label htmlFor="instant-access">Instant Access Available</label>
      </div>
    </div>
  );
}
