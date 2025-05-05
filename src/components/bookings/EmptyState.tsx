
import React from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  isLoggedIn: boolean;
}

export default function EmptyState({ isLoggedIn }: EmptyStateProps) {
  return (
    <div className="container-app flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="flex flex-col items-center text-center max-w-xs">
        <CalendarDays size={48} className="text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          {isLoggedIn ? "No bookings yet" : "No bookings yet"}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isLoggedIn 
            ? "Start exploring properties to book your next stay"
            : "Sign in to view your bookings and access your stays"
          }
        </p>
        <Button className="w-full" asChild>
          {isLoggedIn ? (
            <Link to="/">Find Properties</Link>
          ) : (
            <Link to="/entry">Login</Link>
          )}
        </Button>
      </div>
    </div>
  );
}
