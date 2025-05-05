
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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
  const [activeTab, setActiveTab] = useState("personal");
  
  // This function will be called when a tab is selected from the carousel
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const tabs = [
    { id: "personal", label: "Personal Info" },
    { id: "payment", label: "Payment Methods" },
    { id: "notifications", label: "Notifications" },
    { id: "help", label: "Help" },
    { id: "settings", label: "Settings" },
  ];

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="relative mb-6 overflow-hidden">
        <TabsList className="w-full flex overflow-x-auto hide-scrollbar">
          <Carousel
            opts={{
              align: "start",
              containScroll: "trimSnaps",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {tabs.map((tab) => (
                <CarouselItem key={tab.id} className="pl-1 basis-auto">
                  <TabsTrigger 
                    value={tab.id} 
                    className={`px-4 ${activeTab === tab.id ? "bg-background text-foreground shadow-sm" : ""}`}
                  >
                    {tab.label}
                  </TabsTrigger>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TabsList>
      </div>
      
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
