
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Home, CalendarDays, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-20">{children}</main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
        <div className="container-app">
          <div className="flex items-center justify-around py-3">
            <Link 
              to="/" 
              className={`bottom-nav-item ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
            >
              <Home size={22} />
              <span>Explore</span>
            </Link>
            <Link 
              to="/search" 
              className={`bottom-nav-item ${isActive("/search") ? "text-primary" : "text-muted-foreground"}`}
            >
              <Search size={22} />
              <span>Search</span>
            </Link>
            <Link 
              to="/bookings" 
              className={`bottom-nav-item ${isActive("/bookings") ? "text-primary" : "text-muted-foreground"}`}
            >
              <CalendarDays size={22} />
              <span>Bookings</span>
            </Link>
            <Link 
              to="/profile" 
              className={`bottom-nav-item ${isActive("/profile") ? "text-primary" : "text-muted-foreground"}`}
            >
              <User size={22} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
