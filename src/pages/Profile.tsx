import React, { useState } from "react";
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
  Shield,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import TwoFactorAuth from "../components/auth/TwoFactorAuth";

export default function Profile() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
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

  const profileSections = [
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Profile</h1>
          <ThemeToggle />
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-brand-teal to-brand-red/80">
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

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          {/* Sidebar */}
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
                              className="text-muted-foreground"
                            />
                            <span>{item.label}</span>
                          </div>
                          <Switch checked={item.isActive} />
                        </button>
                      ) : item.onClick ? (
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

          {/* Content Area */}
          <div>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="help">Help</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <p className="text-muted-foreground">
                    Update your personal details and contact information
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User size={16} /> Full Name
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail size={16} /> Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone size={16} /> Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address" className="flex items-center gap-2">
                        <MapPin size={16} /> Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={personalInfo.address}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSavePersonalInfo}>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <p className="text-muted-foreground">
                    Manage your payment methods for booking properties
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  {/* Existing Payment Methods */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/25</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleRemovePaymentMethod}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  {/* Add Payment Method */}
                  <Button onClick={handleAddPaymentMethod} className="w-full">
                    <CreditCard className="mr-2" size={18} />
                    Add Payment Method
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Notification Settings</h2>
                  <p className="text-muted-foreground">
                    Choose how you want to be notified about activity and updates
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Email Notifications</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={notificationSettings.email}
                            onCheckedChange={() => handleNotificationToggle('email')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Push Notifications</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={notificationSettings.push}
                            onCheckedChange={() => handleNotificationToggle('push')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Booking Reminders</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={notificationSettings.bookingReminders}
                            onCheckedChange={() => handleNotificationToggle('bookingReminders')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Check-in Alerts</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={notificationSettings.checkInAlerts}
                            onCheckedChange={() => handleNotificationToggle('checkInAlerts')}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Promotional Offers</TableCell>
                        <TableCell className="text-right">
                          <Switch 
                            checked={notificationSettings.promotions}
                            onCheckedChange={() => handleNotificationToggle('promotions')}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="help" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Help Center</h2>
                  <p className="text-muted-foreground">
                    Find answers to common questions and get support
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Frequently Asked Questions</h3>
                    <div className="rounded-lg border p-4 space-y-4">
                      <div>
                        <h4 className="font-medium">How do I access my property?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your access code will be available in the app 1 hour before check-in time.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">What is the cancellation policy?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Cancellation policies vary by property. Check the specific property details.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium">How do I contact support?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          You can reach our support team via email at support@bedfast.com or through the in-app support chat.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-muted p-6 text-center">
                    <h3 className="font-medium mb-2">Still need help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our support team is available 24/7 to assist you with any questions or issues.
                    </p>
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                  <p className="text-muted-foreground">
                    Manage your account preferences and security settings
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Language</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <span>English (US)</span>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Password</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between">
                        <span>••••••••••••</span>
                        <Button variant="outline" size="sm">Change</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Danger Zone</h3>
                    <div className="rounded-lg border border-destructive/20 p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Delete Account</p>
                          <p className="text-sm text-muted-foreground">
                            This will permanently delete your account and all associated data.
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
