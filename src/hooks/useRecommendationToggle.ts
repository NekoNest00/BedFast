
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useRecommendationToggle() {
  const [showRecommended, setShowRecommended] = useState(false);

  const toggleRecommended = () => {
    setShowRecommended(!showRecommended);
    
    if (!showRecommended) {
      toast({
        title: "For You",
        description: "Showing personalized recommendations based on your preferences",
      });
    }
  };

  return {
    showRecommended,
    toggleRecommended
  };
}
