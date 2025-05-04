
import React from "react";
import { Button } from "@/components/ui/button";

interface FilterActionButtonsProps {
  onReset: () => void;
  onApply: () => void;
}

export default function FilterActionButtons({ 
  onReset, 
  onApply 
}: FilterActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onReset} className="flex-1">
        Reset All
      </Button>
      <Button onClick={onApply} className="flex-1">
        Apply Filters
      </Button>
    </div>
  );
}
