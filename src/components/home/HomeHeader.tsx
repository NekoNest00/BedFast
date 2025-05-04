
import React from "react";
import ThemeToggle from "../ThemeToggle";

export default function HomeHeader() {
  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">BedFast</h1>
        <p className="text-sm text-muted-foreground">Find and access homes instantly</p>
      </div>
      <ThemeToggle />
    </div>
  );
}
