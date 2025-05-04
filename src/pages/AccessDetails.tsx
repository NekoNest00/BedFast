
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import AccessPinDisplay from "../components/access/AccessPinDisplay";
import PropertyAccessHeader from "../components/access/PropertyAccessHeader";
import AccessActions from "../components/access/AccessActions";
import AccessInstructions from "../components/access/AccessInstructions";
import AccessSupport from "../components/access/AccessSupport";
import AccessTestControls from "../components/access/AccessTestControls";
import AdditionalInfo from "../components/access/AdditionalInfo";
import SimpleAccessLog from "../components/access/SimpleAccessLog";
import { useAccessStatus } from "../hooks/useAccessStatus";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function AccessDetails() {
  const { id } = useParams<{ id: string }>();
  const { isOffline, toggleOfflineMode } = useNetworkStatus();
  
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
  
  // Check if we're within the access window
  const { isWithinAccessWindow } = useAccessStatus({
    accessStart: booking.accessStart,
    accessEnd: booking.accessEnd
  });
  
  // Generate mock access log entries
  const accessLogEntries = [
    { label: "PIN Generated", time: booking.pinIssueTime },
    { label: "Booking Confirmed", time: new Date(booking.pinIssueTime.getTime() - 1000 * 60 * 5) },
    { label: "Payment Processed", time: new Date(booking.pinIssueTime.getTime() - 1000 * 60 * 10) }
  ];

  return (
    <Layout>
      <div className="container-app py-6">
        <PropertyAccessHeader booking={booking} />
        
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
            
            <AccessActions 
              booking={booking} 
              isWithinAccessWindow={isWithinAccessWindow} 
            />
            
            <AccessInstructions />
          </div>
          
          <div className="space-y-4">
            <AccessSupport 
              supportEmail={booking.supportEmail} 
              supportPhone={booking.supportPhone} 
            />
            
            <AccessTestControls 
              isOffline={isOffline} 
              toggleOfflineMode={toggleOfflineMode} 
            />
            
            <AdditionalInfo />
            
            <SimpleAccessLog logEntries={accessLogEntries} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
