
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface AccessDurationSliderProps {
  accessHours: number;
  setAccessHours: (hours: number) => void;
  maxHours: number;
}

export default function AccessDurationSlider({
  accessHours,
  setAccessHours,
  maxHours,
}: AccessDurationSliderProps) {
  const handleAccessHoursChange = (value: number[]) => {
    setAccessHours(value[0]);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor="accessDuration">Access Duration</Label>
        <span className="text-sm text-muted-foreground">{accessHours} hours</span>
      </div>
      <Slider
        id="accessDuration"
        min={1}
        max={maxHours}
        step={1}
        value={[accessHours]}
        onValueChange={handleAccessHoursChange}
      />
      <p className="text-xs text-muted-foreground">
        Set how long the guest will have access (1-{maxHours} hours)
      </p>
    </div>
  );
}
