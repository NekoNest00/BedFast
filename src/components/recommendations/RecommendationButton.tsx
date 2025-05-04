
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
      className={`rounded-full text-xs h-8 ${
        active
          ? "bg-brand-red text-white border-none hover:bg-brand-red/90"
          : ""
      }`}
    >
      <Sparkles size={14} className="mr-1" />
      For You
    </Button>
  );
};

export default RecommendationButton;
