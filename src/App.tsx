
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import EntrySequence from "./pages/EntrySequence";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import AccessDetails from "./pages/AccessDetails";
import NotFound from "./pages/NotFound";
import ViewingDetails from "./pages/ViewingDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/entry" element={<EntrySequence />} />
              <Route path="/" element={<Index />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/access/:id" element={<AccessDetails />} />
              <Route path="/viewing/:id" element={<ViewingDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
