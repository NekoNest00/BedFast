
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import OAuthButtons from "@/components/auth/OAuthButtons";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import TwoFactorAuth from "@/components/auth/TwoFactorAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

type AuthView = "login" | "signup" | "forgot-password" | "two-factor";

const Auth = () => {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-brand-red to-brand-teal rounded-full mx-auto flex items-center justify-center mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7H5V10H19V7Z" fill="currentColor" />
                <path d="M17 3C18.1 3 19 3.9 19 5H5C5 3.9 5.9 3 7 3H17Z" fill="currentColor" />
                <path d="M22 10H2V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V10Z" fill="currentColor" />
                <circle cx="9" cy="15.5" r="1.5" fill="white" />
                <circle cx="15" cy="15.5" r="1.5" fill="white" />
              </svg>
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Welcome to BedFast
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {view === "login" && "Sign in to your account"}
              {view === "signup" && "Create a new account"}
              {view === "forgot-password" && "Reset your password"}
              {view === "two-factor" && "Verify your identity"}
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {view === "login" && (
                <div className="space-y-6">
                  <OAuthButtons />
                  <LoginForm 
                    onForgotPassword={() => setView("forgot-password")} 
                    setEmail={setEmail}
                  />
                </div>
              )}

              {view === "signup" && (
                <div className="space-y-6">
                  <OAuthButtons />
                  <SignUpForm />
                </div>
              )}

              {view === "forgot-password" && (
                <ForgotPasswordForm onBack={() => setView("login")} />
              )}

              {view === "two-factor" && (
                <TwoFactorAuth 
                  email={email}
                  onBack={() => setView("login")}
                  onComplete={() => {
                    // Redirect to home page or wherever needed
                    navigate("/");
                  }} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="p-6 text-center">
        {view === "login" && (
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button 
              onClick={() => setView("signup")} 
              className="text-brand-teal hover:underline"
            >
              Create one
            </button>
          </p>
        )}
        
        {view === "signup" && (
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button 
              onClick={() => setView("login")} 
              className="text-brand-teal hover:underline"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
