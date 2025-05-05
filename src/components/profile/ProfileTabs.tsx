
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <div className="relative mb-6">
        <Carousel
          opts={{
            align: "start",
            containScroll: "trimSnaps",
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            <CarouselItem className="pl-1 basis-auto">
              <TabsTrigger 
                value="personal" 
                className={`px-4 ${activeTab === "personal" ? "bg-background text-foreground shadow-sm" : ""}`}
                onClick={() => handleTabChange("personal")}
              >
                Personal Info
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className="pl-1 basis-auto">
              <TabsTrigger 
                value="payment" 
                className={`px-4 ${activeTab === "payment" ? "bg-background text-foreground shadow-sm" : ""}`}
                onClick={() => handleTabChange("payment")}
              >
                Payment Methods
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className="pl-1 basis-auto">
              <TabsTrigger 
                value="notifications" 
                className={`px-4 ${activeTab === "notifications" ? "bg-background text-foreground shadow-sm" : ""}`}
                onClick={() => handleTabChange("notifications")}
              >
                Notifications
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className="pl-1 basis-auto">
              <TabsTrigger 
                value="help" 
                className={`px-4 ${activeTab === "help" ? "bg-background text-foreground shadow-sm" : ""}`}
                onClick={() => handleTabChange("help")}
              >
                Help
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className="pl-1 basis-auto">
              <TabsTrigger 
                value="settings" 
                className={`px-4 ${activeTab === "settings" ? "bg-background text-foreground shadow-sm" : ""}`}
                onClick={() => handleTabChange("settings")}
              >
                Settings
              </TabsTrigger>
            </CarouselItem>
          </CarouselContent>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <CarouselNext className="h-7 w-7 -translate-y-1/2" />
          </div>
        </Carousel>
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
