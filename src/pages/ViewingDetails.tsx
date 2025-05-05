
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { format, isAfter, isBefore, addMinutes } from "date-fns";
import ViewingHeader from "@/components/viewings/ViewingHeader";
import ViewingAccessCard from "@/components/viewings/ViewingAccessCard";
import ViewingInstructions from "@/components/viewings/ViewingInstructions";
import ViewingFeedbackCard from "@/components/viewings/ViewingFeedbackCard";
import ViewingHelp from "@/components/viewings/ViewingHelp";

export default function ViewingDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // In a real app, we would fetch this from an API using the ID
  // For this demo, we're using state passed through navigation
  const viewingData = location.state || {
    propertyId: "prop123",
    propertyName: "Modern Downtown Apartment",
    propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    viewingDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 2), // 2 hours from now
    viewingTime: "2:00 PM",
    pin: "5678"
  };
  
  // Create actual date objects from the viewing data
  const viewingDateTime = new Date(viewingData.viewingDate);
  // Set the hours and minutes based on the time string
  const [hours, minutes] = viewingData.viewingTime.match(/(\d+):(\d+)/)?.[0].split(":") || [14, 0];
  const period = viewingData.viewingTime.includes("PM") ? "PM" : "AM";
  const adjustedHours = period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours);
  
  viewingDateTime.setHours(adjustedHours, parseInt(minutes));
  
  // Access window (30 minutes before and 30 minutes after viewing)
  const accessStart = addMinutes(viewingDateTime, -30);
  const accessEnd = addMinutes(viewingDateTime, 30);
  
  // Update the current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Function to determine the access status
  const getAccessStatus = (): "active" | "upcoming" | "expired" => {
    if (isAfter(currentTime, accessStart) && isBefore(currentTime, accessEnd)) {
      return "active";
    } else if (isBefore(currentTime, accessStart)) {
      return "upcoming";
    } else {
      return "expired";
    }
  };
  
  const accessStatus = getAccessStatus();
  
  // Function to determine if the PIN should be shown
  const shouldShowPin = (): boolean => {
    return accessStatus === "active";
  };
  
  return (
    <Layout>
      <div className="container-app py-6">
        <ViewingHeader
          propertyName={viewingData.propertyName}
          propertyImage={viewingData.propertyImage}
          viewingDateTime={viewingDateTime}
          viewingTime={viewingData.viewingTime}
          accessStart={accessStart}
          accessEnd={accessEnd}
          accessStatus={accessStatus}
          id={id || ""}
        />
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ViewingAccessCard
              pin={viewingData.pin}
              accessStatus={accessStatus}
              accessEnd={accessEnd}
              accessStart={accessStart}
              shouldShowPin={shouldShowPin()}
            />
            
            <ViewingInstructions />
          </div>
          
          <div className="space-y-4">
            <ViewingFeedbackCard 
              accessStatus={accessStatus}
              propertyName={viewingData.propertyName}
            />
            
            <ViewingHelp />
          </div>
        </div>
      </div>
    </Layout>
  );
}
