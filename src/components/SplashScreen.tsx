
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="relative w-24 h-24 mb-6"
          animate={{ 
            rotate: [0, 0, 0, 0, 0],
            scale: [1, 1.2, 1.2, 1, 1],
          }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-brand-red"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="w-full h-full bg-gradient-to-br from-brand-red to-brand-teal rounded-full flex items-center justify-center text-white">
            <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 7H5V10H19V7Z" fill="currentColor" />
              <path d="M17 3C18.1 3 19 3.9 19 5H5C5 3.9 5.9 3 7 3H17Z" fill="currentColor" />
              <path d="M22 10H2V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V10Z" fill="currentColor" />
              <circle cx="9" cy="15.5" r="1.5" fill="white" />
              <circle cx="15" cy="15.5" r="1.5" fill="white" />
            </svg>
          </div>
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          BedFast
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Instant Access Stays
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
