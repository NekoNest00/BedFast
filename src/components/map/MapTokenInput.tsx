
import React from "react";

interface MapTokenInputProps {
  onTokenSubmit: (token: string) => void;
}

export default function MapTokenInput({ onTokenSubmit }: MapTokenInputProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 z-10 p-4">
      <p className="text-sm text-muted-foreground mb-2">Please enter your Mapbox token:</p>
      <input
        type="text"
        className="w-full max-w-sm p-2 border rounded-md mb-2"
        placeholder="pk.eyJ1IjoieW91..."
        onChange={(e) => onTokenSubmit(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">
        Get your token at <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
      </p>
    </div>
  );
}
