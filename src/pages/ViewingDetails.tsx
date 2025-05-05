import React, { useState, useEffect } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Clock, ArrowLeft, CheckCircle, XCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { format, isAfter, isBefore, addMinutes } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function ViewingDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<"positive" | "negative" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  
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
  
  // Format the access window
  const formatAccessWindow = () => {
    return `${format(accessStart, "h:mm a")} - ${format(accessEnd, "h:mm a")}`;
  };
  
  // Copy PIN to clipboard
  const copyPinToClipboard = () => {
    navigator.clipboard.writeText(viewingData.pin).then(() => {
      toast({
        title: "PIN Copied",
        description: "Viewing PIN copied to clipboard",
      });
    }, () => {
      toast({
        title: "Copy failed", 
        description: "Please copy the PIN manually",
        variant: "destructive",
      });
    });
  };
  
  // Submit feedback
  const submitFeedback = () => {
    if (!feedbackRating) {
      toast({
        title: "Please select a rating",
        description: "Let us know if you're interested in the property",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send feedback to an API
    toast({
      title: "Thank you for your feedback",
      description: "Your response has been recorded",
    });
    
    setIsDialogOpen(false);
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
    <Layout>
      <div className="container-app py-6">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Properties
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
              <img 
                src={viewingData.propertyImage} 
                alt={viewingData.propertyName}
                className="w-full h-40 object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold mb-1">{viewingData.propertyName}</h1>
                {renderStatusBadge()}
              </div>
              
              <p className="text-muted-foreground mb-3">Viewing ID: {id}</p>
              
              <div className="space-y-2">
                <p className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="font-medium">Viewing Time:</span>
                  <span className="ml-2">{format(viewingDateTime, "MMMM d, yyyy")} at {viewingData.viewingTime}</span>
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
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border shadow-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900/30 dark:to-indigo-900/20 pb-3">
                <CardTitle className="text-lg">Property Viewing Access</CardTitle>
              </CardHeader>
              
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Lock size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Temporary Access PIN</h3>
                    {accessStatus === "active" && (
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                        <Clock size={14} />
                        Access active - Expires {format(accessEnd, "h:mm a")}
                      </p>
                    )}
                    {accessStatus === "upcoming" && (
                      <p className="text-sm text-amber-600 dark:text-amber-400">
                        Access begins at {format(accessStart, "h:mm a")}
                      </p>
                    )}
                    {accessStatus === "expired" && (
                      <p className="text-sm text-gray-500">Viewing access has expired</p>
                    )}
                  </div>
                </div>
                
                <div className="pt-2 pb-1">
                  {shouldShowPin() ? (
                    <div className="space-y-2">
                      <div className="flex gap-2 justify-center">
                        {viewingData.pin.split('').map((digit, i) => (
                          <div 
                            key={i} 
                            className="w-11 h-14 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-mono text-xl font-bold"
                          >
                            {digit}
                          </div>
                        ))}
                      </div>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Use this PIN to unlock the door during your access window
                      </p>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={copyPinToClipboard}
                      >
                        Copy PIN to Clipboard
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground">
                        {accessStatus === "upcoming" ? 
                          "Your PIN will be displayed when your access period begins" : 
                          "Your viewing access period has ended"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <h3 className="font-medium mb-2">How to Use Your Viewing Access</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Arrive at the property during your access window</li>
                <li>Locate the digital keypad near the front entrance</li>
                <li>Enter your PIN code shown above</li>
                <li>The door will unlock automatically</li>
                <li>Your PIN will deactivate after your access window ends</li>
              </ol>
            </div>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Viewing Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  After your viewing, we'd love to hear your thoughts about the property.
                </p>
                
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" disabled={accessStatus === "upcoming"}>
                      {accessStatus === "expired" ? "Submit Feedback" : "Submit Feedback After Viewing"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Property Viewing Feedback</DialogTitle>
                      <DialogDescription>
                        Thank you for viewing {viewingData.propertyName}. Please share your thoughts.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div>
                        <h4 className="font-medium mb-2">Are you interested in this property?</h4>
                        <RadioGroup 
                          value={feedbackRating || ""}
                          onValueChange={(value) => setFeedbackRating(value as "positive" | "negative")}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="positive" id="positive" />
                            <Label htmlFor="positive" className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1 text-green-500" /> Yes, interested
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="negative" id="negative" />
                            <Label htmlFor="negative" className="flex items-center">
                              <ThumbsDown className="h-4 w-4 mr-1 text-red-500" /> Not interested
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label htmlFor="feedback" className="mb-2 block">Additional comments (optional)</Label>
                        <Textarea
                          id="feedback"
                          placeholder="Share your thoughts about the property..."
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={submitFeedback}>
                        Submit Feedback
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Next Steps</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">View the property using your temporary PIN</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Submit your feedback after the viewing</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">If interested, you can book the property from the main listing</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-3">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Contact support:</strong>
                </p>
                <Button variant="link" className="h-auto p-0 text-sm" 
                  onClick={() => window.location.href = "mailto:support@example.com"}>
                  support@example.com
                </Button>
                <p>
                  <strong>Emergency phone:</strong> (123) 456-7890
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
