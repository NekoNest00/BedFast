
import React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DateSelectorProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDateSelect: (range: { from: Date; to: Date | undefined }) => void;
  propertyName: string;
}

export default function DateSelector({
  startDate,
  endDate,
  isOpen,
  setIsOpen,
  onDateSelect,
  propertyName,
}: DateSelectorProps) {
  return (
    <>
      <div 
        className="border rounded-lg p-3 flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Dates</span>
          <span className="text-sm text-muted-foreground">
            {startDate && endDate
              ? `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`
              : 'Select dates'}
          </span>
        </div>
        <CalendarDays size={18} className="text-muted-foreground" />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Select your stay dates</DialogTitle>
            <DialogDescription>
              Choose check-in and check-out dates for your stay at {propertyName}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="range"
              selected={{
                from: startDate,
                to: endDate,
              }}
              onSelect={onDateSelect}
              disabled={{ before: new Date() }}
              numberOfMonths={1}
              className="pointer-events-auto"
            />
          </div>
          <DialogFooter>
            <Button onClick={() => startDate && endDate && setIsOpen(false)}>
              Confirm Dates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
