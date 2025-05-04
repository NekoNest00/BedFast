
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  User,
  Settings,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface ProfileSectionItem {
  icon: React.FC<any>;
  label: string;
  link?: string;
  tab?: string;
  toggle?: boolean;
  onClick?: () => void;
  onToggle?: () => void;
  isActive?: boolean;
}

interface ProfileSection {
  title: string;
  items: ProfileSectionItem[];
}

export default function ProfileSidebar({ 
  setShowTwoFactor 
}: { 
  setShowTwoFactor: (show: boolean) => void 
}) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const profileSections: ProfileSection[] = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information", link: "#personal-info", tab: "personal" },
        { icon: CreditCard, label: "Payment Methods", link: "#payment-methods", tab: "payment" },
        { icon: Shield, label: "Two-Factor Authentication", link: "#", onClick: () => setShowTwoFactor(true) },
        { icon: Bell, label: "Notifications", link: "#notifications", tab: "notifications" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { 
          icon: theme === "dark" ? Moon : Sun, 
          label: `${theme === 'light' ? 'Dark' : 'Light'} Mode`, 
          toggle: true, 
          onToggle: toggleTheme,
          isActive: theme === "dark"
        },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", link: "#help", tab: "help" },
        { icon: Settings, label: "Account Settings", link: "#settings", tab: "settings" },
        { icon: LogOut, label: "Logout", onClick: logout },
      ],
    },
  ];

  return (
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
                {item.toggle ? (
                  <button
                    onClick={item.onToggle}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className="text-brand-red"
                      />
                      <span>{item.label}</span>
                    </div>
                    <Switch 
                      checked={item.isActive} 
                      className="data-[state=checked]:bg-brand-red"
                    />
                  </button>
                ) : item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className="text-brand-red"
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
                        className="text-brand-red"
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
  );
}
