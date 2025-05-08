
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Key, Eye, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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

  // Navigation items for cleaner code
  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/bookings", label: "Bookings", icon: CalendarDays },
    { path: "/access", label: "Access", icon: Key },
    { path: "/viewings", label: "Viewings", icon: Eye },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-lg mx-auto">
      <main className="flex-1 pb-20">{children}</main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm z-50">
        <div className="container-app max-w-lg mx-auto">
          <div className="flex items-center justify-around py-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center",
                  isActive(item.path) ? "text-brand-red" : "text-muted-foreground"
                )}
              >
                {isActive(item.path) ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <item.icon size={20} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center">
                    <item.icon size={20} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
