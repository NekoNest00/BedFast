
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface ViewingHeaderProps {
  propertyName: string;
  propertyImage: string;
  viewingDateTime: Date;
  viewingTime: string;
  accessStart: Date;
  accessEnd: Date;
  accessStatus: "active" | "upcoming" | "expired";
  id: string;
}

export default function ViewingHeader({
  propertyName,
  propertyImage,
  viewingDateTime,
  viewingTime,
  accessStart,
  accessEnd,
  accessStatus,
  id
}: ViewingHeaderProps) {
  // Format the access window
  const formatAccessWindow = () => {
    return `${format(accessStart, "h:mm a")} - ${format(accessEnd, "h:mm a")}`;
  };
  
  // Status badge
  const renderStatusBadge = () => {
    switch (accessStatus) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Access Active</Badge>;
      case "upcoming":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Access Upcoming</Badge>;
      case "expired":
        return <Badge variant="outline" className="border-gray-400 text-gray-400">Access Expired</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
        </Link>
      </Button>
      
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
          <img 
            src={propertyImage} 
            alt={propertyName}
            className="w-full h-40 object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-1">{propertyName}</h1>
            {renderStatusBadge()}
          </div>
          
          <p className="text-muted-foreground mb-3">Viewing ID: {id}</p>
          
          <div className="space-y-2">
            <p className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Viewing Time:</span>
              <span className="ml-2">{format(viewingDateTime, "MMMM d, yyyy")} at {viewingTime}</span>
            </p>
            <p className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              <span className="font-medium">Access Window:</span>
              <span className="ml-2">{formatAccessWindow()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
