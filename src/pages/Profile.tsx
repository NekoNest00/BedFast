
import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  
  const profileSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", link: "#" },
        { icon: CreditCard, label: "Payment Methods", link: "#" },
        { icon: Bell, label: "Notifications", link: "#" },
        { icon: Settings, label: "Account Settings", link: "#" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", link: "#" },
        { icon: LogOut, label: "Logout", onClick: logout },
      ],
    },
  ];

  if (!user) {
    return (
      <Layout>
        <div className="container-app flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <h2 className="text-xl font-semibold mb-4">Sign in to your account</h2>
          <button className="btn-primary w-full max-w-xs">Login</button>
          <p className="mt-4 text-muted-foreground text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-primary underline">
              Sign up
            </a>
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <ThemeToggle />
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={user.avatar || "https://i.pravatar.cc/150"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        {/* Profile Sections */}
        <div className="space-y-8">
          {profileSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <div className="rounded-xl overflow-hidden border">
                {section.items.map((item, index) => (
                  <div
                    key={item.label}
                    className={`${
                      index !== section.items.length - 1 && "border-b"
                    }`}
                  >
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className="text-muted-foreground"
                          />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                      </button>
                    ) : (
                      <a
                        href={item.link}
                        className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon
                            size={18}
                            className="text-muted-foreground"
                          />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
