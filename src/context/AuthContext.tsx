
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Helper function to clean up auth state
  const cleanupAuthState = () => {
    // Remove standard auth tokens
    localStorage.removeItem('supabase.auth.token');
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    // Remove from sessionStorage if in use
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Map Supabase user to our User format
          const mappedUser: User = {
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar_url,
          };
          setUser(mappedUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          // Map Supabase user to our User format
          const mappedUser: User = {
            id: data.session.user.id,
            name: data.session.user.user_metadata?.name || data.session.user.email?.split('@')[0] || '',
            email: data.session.user.email || '',
            avatar: data.session.user.user_metadata?.avatar_url,
          };
          setUser(mappedUser);
        }
      } catch (error) {
        console.error("Error checking auth session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Enhanced login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Clean up existing auth state to prevent conflicts
      cleanupAuthState();
      
      // Attempt global sign out first (prevents auth limbo states)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Authentication was successful, map the user data
      if (data.user) {
        const mappedUser: User = {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
          email: data.user.email || '',
          avatar: data.user.user_metadata?.avatar_url,
        };
        setUser(mappedUser);

        toast({
          title: "Login successful!",
          description: "Welcome back to BedFast",
        });
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      
      // Provide user-friendly error messages
      const errorMessage = error.message || "Failed to login. Please check your credentials and try again.";
      
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (error) {
        // Continue even if this fails
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          }
        }
      });

      if (error) throw error;

      // Check if email confirmation is required
      if (data.user && data.session) {
        // Auto sign-in (email confirmation not required)
        const mappedUser: User = {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || '',
          email: data.user.email || '',
          avatar: data.user.user_metadata?.avatar_url,
        };
        setUser(mappedUser);

        toast({
          title: "Account created!",
          description: "Welcome to BedFast",
        });
      } else if (data.user) {
        // Email confirmation required
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account",
        });
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      
      // Provide user-friendly error messages
      let errorMessage = "Failed to create account. Please try again.";
      
      if (error.message?.includes('already registered')) {
        errorMessage = "This email is already registered. Please try logging in instead.";
      }
      
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: errorMessage,
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced logout function
  const logout = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear user state
      setUser(null);
      
      // Display toast
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "Failed to log out. Please try again.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading,
      login, 
      logout,
      signup
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
