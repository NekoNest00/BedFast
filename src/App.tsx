
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

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

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Use the auth context to check if the user is authenticated
  const { isAuthenticated, isLoading } = useAuth();
  
  // While checking authentication status, show nothing
  if (isLoading) {
    return null;
  }
  
  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  // If authenticated, render the children
  return <>{children}</>;
};

// Import useAuth inside the App component to avoid the React hooks error
const AppRoutes = () => {
  const { useAuth } = require("./context/AuthContext");
  
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
