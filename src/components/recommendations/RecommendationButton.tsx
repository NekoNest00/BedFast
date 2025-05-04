
import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecommendationButtonProps {
  onClick: () => void;
  active: boolean;
}

const RecommendationButton = ({ onClick, active }: RecommendationButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? "default" : "outline"}
      className={`rounded-full px-3 py-1 text-xs h-8 shadow-sm transition-all ${
        active
          ? "bg-gradient-to-r from-brand-red to-[#ff6b4a] text-white"
          : "bg-background"
      }`}
    >
      <Sparkles size={14} className="mr-1" />
      For You
    </Button>
  );
};

export default RecommendationButton;
