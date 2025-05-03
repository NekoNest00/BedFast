
import React, { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import OnboardingSlides from "@/components/OnboardingSlides";
import Auth from "@/pages/Auth";
import { AnimatePresence, motion } from "framer-motion";

type EntryStep = "splash" | "onboarding" | "auth";

const EntrySequence = () => {
  const [currentStep, setCurrentStep] = useState<EntryStep>("splash");
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
  
  // Check if user has seen onboarding
  useEffect(() => {
    const onboardingSeen = localStorage.getItem("onboardingSeen");
    if (onboardingSeen === "true") {
      setHasSeenOnboarding(true);
    }
  }, []);
  
  // Handle splash screen completion
  const handleSplashComplete = () => {
    if (hasSeenOnboarding) {
      setCurrentStep("auth");
    } else {
      setCurrentStep("onboarding");
    }
  };
  
  // Handle onboarding completion
  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingSeen", "true");
    setCurrentStep("auth");
  };
  
  return (
    <AnimatePresence mode="wait">
      {currentStep === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      
      {currentStep === "onboarding" && (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <OnboardingSlides onComplete={handleOnboardingComplete} />
        </motion.div>
      )}
      
      {currentStep === "auth" && (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Auth />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntrySequence;
