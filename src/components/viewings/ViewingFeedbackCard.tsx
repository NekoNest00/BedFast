
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ViewingFeedbackDialog from "./ViewingFeedbackDialog";

interface ViewingFeedbackCardProps {
  accessStatus: "active" | "upcoming" | "expired";
  propertyName: string;
}

export default function ViewingFeedbackCard({ 
  accessStatus, 
  propertyName 
}: ViewingFeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Property Viewing Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          After your viewing, we'd love to hear your thoughts about the property.
        </p>
        
        <ViewingFeedbackDialog 
          accessStatus={accessStatus} 
          propertyName={propertyName}
        />
      </CardContent>
    </Card>
  );
}
