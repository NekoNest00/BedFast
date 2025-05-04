
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import AccessPinDisplay from "../components/access/AccessPinDisplay";

export default function AccessDetails() {
  const { id } = useParams<{ id: string }>();
  const [isOffline, setIsOffline] = useState(false);
  
  // Mock booking data - in a real app, this would come from an API
  const booking = {
    id: id || "booking1",
    propertyId: "prop123",
    propertyName: "Modern Downtown Apartment",
    pin: "1234",
    startDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 1), // 1 hour from now
    endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 48), // 48 hours from now
    pinIssueTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24) // 24 hours ago
  };
  
  // Demo function to toggle online/offline state
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline);
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
      <div className="container-app py-8">
        <h1 className="text-2xl font-bold mb-6">Your Digital Access</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <AccessPinDisplay 
              pin={booking.pin}
              propertyName={booking.propertyName}
              startDate={booking.startDate}
              endDate={booking.endDate}
              isOffline={isOffline}
              pinIssueTime={booking.pinIssueTime}
            />
            
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
              <h3 className="font-medium mb-3">Test Controls (Demo only)</h3>
              <button
                onClick={toggleOfflineMode}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
              >
                Toggle {isOffline ? "Online" : "Offline"} Mode
              </button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Additional Access Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Need help?</strong> Contact property manager at support@example.com or call (123) 456-7890.
                </p>
                <p>
                  <strong>Wi-Fi:</strong> "ApartmentGuest" / Password: "welcome123"
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
