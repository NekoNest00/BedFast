
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import EntrySequence from "./pages/EntrySequence";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import AccessDetails from "./pages/AccessDetails";
import NotFound from "./pages/NotFound";
import ViewingDetails from "./pages/ViewingDetails";
import Access from "./pages/Access";
import { useEffect, useState } from "react";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Use the auth context to check if the user is authenticated
  const { isAuthenticated, isLoading } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  useEffect(() => {
    // Give a short delay to allow auth state to stabilize
    const timer = setTimeout(() => {
      setCheckingAuth(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // While checking authentication status, show loading state
  if (isLoading || checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-zinc-200 dark:bg-zinc-700 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-24"></div>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If authenticated, render the children
  return <>{children}</>;
};

// Routes component that uses the useAuth hook directly
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/entry" element={<EntrySequence />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Index />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/bookings" element={
        <ProtectedRoute>
          <Bookings />
        </ProtectedRoute>
      } />
      <Route path="/access" element={
        <ProtectedRoute>
          <Access />
        </ProtectedRoute>
      } />
      <Route path="/access/:id" element={
        <ProtectedRoute>
          <AccessDetails />
        </ProtectedRoute>
      } />
      <Route path="/viewings" element={
        <ProtectedRoute>
          <ViewingDetails />
        </ProtectedRoute>
      } />
      <Route path="/viewing/:id" element={
        <ProtectedRoute>
          <ViewingDetails />
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const AppWithAuth = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppWithAuth />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
