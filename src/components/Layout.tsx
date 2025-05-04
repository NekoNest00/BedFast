
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, CalendarDays, Key, Eye, User } from "lucide-react";
import { motion } from "framer-motion";

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
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm z-50">
        <div className="container-app">
          <div className="flex items-center justify-around py-3">
            <Link 
              to="/" 
              className={`bottom-nav-item ${isActive("/") ? "text-[#800020] font-medium" : "text-muted-foreground"}`}
            >
              {isActive("/") ? (
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <Home size={22} className="text-[#800020]" />
                  <span>Home</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <Home size={22} />
                  <span>Home</span>
                </div>
              )}
            </Link>

            <Link 
              to="/bookings" 
              className={`bottom-nav-item ${isActive("/bookings") ? "text-[#800020] font-medium" : "text-muted-foreground"}`}
            >
              {isActive("/bookings") ? (
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <CalendarDays size={22} className="text-[#800020]" />
                  <span>Bookings</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <CalendarDays size={22} />
                  <span>Bookings</span>
                </div>
              )}
            </Link>

            <Link 
              to="/access" 
              className={`bottom-nav-item ${isActive("/access") ? "text-[#800020] font-medium" : "text-muted-foreground"}`}
            >
              {isActive("/access") ? (
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <Key size={22} className="text-[#800020]" />
                  <span>Access</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <Key size={22} />
                  <span>Access</span>
                </div>
              )}
            </Link>

            <Link 
              to="/viewings" 
              className={`bottom-nav-item ${isActive("/viewings") ? "text-[#800020] font-medium" : "text-muted-foreground"}`}
            >
              {isActive("/viewings") ? (
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <Eye size={22} className="text-[#800020]" />
                  <span>Viewings</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <Eye size={22} />
                  <span>Viewings</span>
                </div>
              )}
            </Link>

            <Link 
              to="/profile" 
              className={`bottom-nav-item ${isActive("/profile") ? "text-[#800020] font-medium" : "text-muted-foreground"}`}
            >
              {isActive("/profile") ? (
                <motion.div 
                  initial={{ scale: 0.8 }} 
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <User size={22} className="text-[#800020]" />
                  <span>Profile</span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <User size={22} />
                  <span>Profile</span>
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
