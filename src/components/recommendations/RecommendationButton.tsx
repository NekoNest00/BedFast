
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
      className={`rounded-full px-4 py-2 text-sm h-9 shadow-md transition-all ${
        active
          ? "bg-gradient-to-r from-brand-red to-[#ff6b4a] text-white animate-pulse"
          : "bg-background hover:shadow-lg"
      }`}
    >
      <Sparkles size={16} className={`mr-2 ${active ? "text-white" : ""}`} />
      For You
    </Button>
  );
};

export default RecommendationButton;
