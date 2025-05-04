
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays, isPast, setHours, setMinutes, isToday } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface ViewingSlot {
  time: string;
  available: boolean;
}

interface ViewingSchedulerProps {
  propertyId: string;
  propertyName: string;
}

export default function ViewingScheduler({ propertyId, propertyName }: ViewingSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // In a real app, these would come from an API based on property availability
  const generateTimeSlots = (date: Date | undefined): ViewingSlot[] => {
    if (!date) return [];
    
    // Generate time slots from 9 AM to 5 PM
    const slots: ViewingSlot[] = [];
    const now = new Date();
    const isCurrentDay = isToday(date);
    
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = setHours(setMinutes(new Date(date), minute), hour);
        
        // If it's today, only show future slots
        if (isCurrentDay && isPast(slotTime)) {
          continue;
        }
        
        // In a real app, we'd check database for availability
        // For demo, make some slots unavailable randomly
        const isAvailable = Math.random() > 0.3;
        
        slots.push({
          time: format(slotTime, "h:mm a"),
          available: isAvailable
        });
      }
    }
    
    return slots;
  };
  
  const timeSlots = generateTimeSlots(selectedDate);
  
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date changes
  };
  
  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
  };
  
  const handleBookViewing = () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        title: "Please select a date and time",
        description: "You must choose when you'd like to view the property",
        variant: "destructive",
      });
      return;
    }
    
    setIsBooking(true);
    
    // Simulate API call to book viewing
    setTimeout(() => {
      // Generate a random viewing ID (in a real app, this would come from the API)
      const viewingId = `viewing-${Math.floor(Math.random() * 10000)}`;
      
      toast({
        title: "Viewing Scheduled!",
        description: `Your viewing is confirmed for ${format(selectedDate, "MMM d")} at ${selectedSlot}`,
      });
      
      // Navigate to the viewing details page
      navigate(`/viewing/${viewingId}`, { 
        state: { 
          propertyId, 
          propertyName, 
          viewingDate: selectedDate,
          viewingTime: selectedSlot,
          pin: Math.floor(1000 + Math.random() * 9000).toString() // Generate random 4-digit PIN
        }
      });
      
      setIsBooking(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Schedule a Viewing</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="calendar">Select Date</TabsTrigger>
            <TabsTrigger value="time" disabled={!selectedDate}>Select Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex flex-col items-center py-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal w-full",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    disabled={(date) => isPast(date) || date > addDays(new Date(), 30)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant={selectedSlot === slot.time ? "default" : "outline"}
                    disabled={!slot.available}
                    onClick={() => handleSlotSelect(slot.time)}
                    className={cn(
                      "h-10",
                      !slot.available && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Clock className="mr-1 h-3 w-3" /> {slot.time}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Please select a date to see available time slots
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          onClick={handleBookViewing}
          disabled={!selectedDate || !selectedSlot || isBooking}
        >
          {isBooking ? "Scheduling..." : "Schedule Viewing"}
        </Button>
      </CardFooter>
    </Card>
  );
}
