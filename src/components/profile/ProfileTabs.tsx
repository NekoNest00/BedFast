
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import PaymentMethodsTab from "./tabs/PaymentMethodsTab";
import NotificationsTab from "./tabs/NotificationsTab";
import HelpCenterTab from "./tabs/HelpCenterTab";
import AccountSettingsTab from "./tabs/AccountSettingsTab";

interface ProfileTabsProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  notificationSettings: {
    email: boolean;
    push: boolean;
    bookingReminders: boolean;
    checkInAlerts: boolean;
    promotions: boolean;
  };
  handlePersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePersonalInfo: () => void;
  handleRemovePaymentMethod: () => void;
  handleAddPaymentMethod: () => void;
  handleNotificationToggle: (setting: string) => void;
}

export default function ProfileTabs({
  personalInfo,
  notificationSettings,
  handlePersonalInfoChange,
  handleSavePersonalInfo,
  handleRemovePaymentMethod,
  handleAddPaymentMethod,
  handleNotificationToggle,
}: ProfileTabsProps) {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="help">Help</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <PersonalInfoTab 
          personalInfo={personalInfo} 
          handlePersonalInfoChange={handlePersonalInfoChange}
          handleSavePersonalInfo={handleSavePersonalInfo}
        />
      </TabsContent>
      
      <TabsContent value="payment">
        <PaymentMethodsTab 
          handleRemovePaymentMethod={handleRemovePaymentMethod}
          handleAddPaymentMethod={handleAddPaymentMethod}
        />
      </TabsContent>
      
      <TabsContent value="notifications">
        <NotificationsTab 
          notificationSettings={notificationSettings}
          handleNotificationToggle={handleNotificationToggle}
        />
      </TabsContent>
      
      <TabsContent value="help">
        <HelpCenterTab />
      </TabsContent>
      
      <TabsContent value="settings">
        <AccountSettingsTab />
      </TabsContent>
    </Tabs>
  );
}
