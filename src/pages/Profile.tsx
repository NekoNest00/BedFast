
import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileTabs from "../components/profile/ProfileTabs";
import TwoFactorAuth from "../components/auth/TwoFactorAuth";

export default function Profile() {
  const { user, logout } = useAuth();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94000",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    bookingReminders: true,
    checkInAlerts: true,
    promotions: false,
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }));
    
    toast.success(`${setting.charAt(0).toUpperCase() + setting.slice(1)} notifications ${notificationSettings[setting as keyof typeof notificationSettings] ? 'disabled' : 'enabled'}`);
  };

  const handleSavePersonalInfo = () => {
    toast.success("Personal information updated successfully");
  };

  const handleRemovePaymentMethod = () => {
    toast.success("Payment method removed successfully");
  };

  const handleAddPaymentMethod = () => {
    toast.success("Payment method added successfully");
  };

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

  if (showTwoFactor) {
    return (
      <Layout>
        <div className="container-app py-6">
          <div className="max-w-md mx-auto mt-10">
            <TwoFactorAuth 
              email={user.email}
              onBack={() => setShowTwoFactor(false)}
              onComplete={() => {
                setShowTwoFactor(false);
                toast.success("Two-factor authentication enabled successfully");
              }}
            />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-6">
        <ProfileHeader />

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar */}
          <ProfileSidebar setShowTwoFactor={setShowTwoFactor} />

          {/* Content Area */}
          <div>
            <ProfileTabs 
              personalInfo={personalInfo}
              notificationSettings={notificationSettings}
              handlePersonalInfoChange={handlePersonalInfoChange}
              handleSavePersonalInfo={handleSavePersonalInfo}
              handleRemovePaymentMethod={handleRemovePaymentMethod}
              handleAddPaymentMethod={handleAddPaymentMethod}
              handleNotificationToggle={handleNotificationToggle}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
