
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ViewingFeedbackDialogProps {
  accessStatus: "active" | "upcoming" | "expired";
  propertyName: string;
}

export default function ViewingFeedbackDialog({ 
  accessStatus, 
  propertyName 
}: ViewingFeedbackDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<"positive" | "negative" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const { toast } = useToast();
  
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

  return (
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
            Thank you for viewing {propertyName}. Please share your thoughts.
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
  );
}
