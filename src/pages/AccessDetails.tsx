
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import AccessPinDisplay from "../components/access/AccessPinDisplay";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy, Users, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GuestAccessForm from "../components/access/GuestAccessForm";
import { format, isBefore, isAfter } from "date-fns";

export default function AccessDetails() {
  const { id } = useParams<{ id: string }>();
  const [isOffline, setIsOffline] = useState(false);
  const { toast } = useToast();
  
  // Mock booking data - in a real app, this would come from an API
  const booking = {
    id: id || "booking1",
    propertyId: "prop123",
    propertyName: "Modern Downtown Apartment",
    propertyAddress: "123 Main Street, Downtown, New York",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    pin: "1234",
    startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 1), // 1 hour from now
    endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 48), // 48 hours from now
    pinIssueTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24), // 24 hours ago
    checkInTime: "4:00 PM",
    checkOutTime: "11:00 AM",
    accessStart: new Date(new Date().getTime() - 1000 * 60 * 60 * 3), // 3 hours ago (for demo)
    accessEnd: new Date(new Date().getTime() + 1000 * 60 * 60 * 72), // 72 hours from now (for demo)
    supportEmail: "support@example.com",
    supportPhone: "(123) 456-7890"
  };
  
  // Function to copy PIN to clipboard
  const copyPinToClipboard = () => {
    navigator.clipboard.writeText(booking.pin).then(() => {
      toast({
        title: "PIN Copied",
        description: "Access PIN copied to clipboard",
      });
    }, () => {
      toast({
        title: "Copy failed",
        description: "Please copy the PIN manually",
        variant: "destructive",
      });
    });
  };
  
  // Demo function to toggle online/offline state
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
  };
  
  // Check if we're within the access window
  const isWithinAccessWindow = () => {
    const now = new Date();
    return isAfter(now, booking.accessStart) && isBefore(now, booking.accessEnd);
  };
  
  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <Layout>
      <div className="container-app py-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start">
          <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
            <img 
              src={booking.propertyImage} 
              alt={booking.propertyName}
              className="w-full h-40 object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{booking.propertyName}</h1>
            <p className="text-muted-foreground mb-3">{booking.propertyAddress}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Check-in</p>
                <p className="font-medium">{format(booking.startDate, "MMM d, yyyy")} at {booking.checkInTime}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Check-out</p>
                <p className="font-medium">{format(booking.endDate, "MMM d, yyyy")} at {booking.checkOutTime}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <AccessPinDisplay 
              pin={booking.pin}
              propertyName={booking.propertyName}
              startDate={booking.startDate}
              endDate={booking.endDate}
              isOffline={isOffline}
              pinIssueTime={booking.pinIssueTime}
            />
            
            {isWithinAccessWindow() && (
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={copyPinToClipboard}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy PIN to Clipboard
                </Button>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Users className="mr-2 h-4 w-4" /> Add Guest Access
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Add Guest Access</SheetTitle>
                    </SheetHeader>
                    <GuestAccessForm 
                      propertyName={booking.propertyName} 
                      startDate={booking.startDate}
                      endDate={booking.endDate}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            )}
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-medium mb-2">How to use your digital access</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Arrive at the property during your access window</li>
                <li>Locate the digital keypad near the front entrance</li>
                <li>Enter your PIN code shown above</li>
                <li>The door will unlock automatically</li>
                <li>Your PIN will remain active throughout your stay</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Contact property manager:</strong>
                </p>
                <Button variant="link" className="h-auto p-0 text-sm" 
                  onClick={() => window.location.href = `mailto:${booking.supportEmail}`}>
                  <HelpCircle size={14} className="mr-1" /> {booking.supportEmail}
                </Button>
                <p>
                  <strong>Emergency phone:</strong> {booking.supportPhone}
                </p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Test Controls (Demo only)</h3>
              <Button
                onClick={toggleOfflineMode}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              >
                Toggle {isOffline ? "Online" : "Offline"} Mode
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Additional Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Wi-Fi:</strong> "ApartmentGuest" / Password: "welcome123"
                </p>
                <p>
                  <strong>Building access code:</strong> 5678 (for main entrance)
                </p>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Access Log</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between py-1 border-b">
                  <span>PIN Generated</span>
                  <span>{booking.pinIssueTime.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span>Booking Confirmed</span>
                  <span>{new Date(booking.pinIssueTime.getTime() - 1000 * 60 * 5).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Payment Processed</span>
                  <span>{new Date(booking.pinIssueTime.getTime() - 1000 * 60 * 10).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
