
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  propertyName
}: DateSelectorProps) {
  const handleSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      onDateSelect({ from: date as Date, to: undefined });
    } else {
      onDateSelect({ from: startDate, to: date as Date });
    }
  };

  return (
    <div className="mb-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border rounded-xl h-auto py-3",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              <div className="grid">
                <span className="font-medium">
                  {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                </span>
                <motion.span 
                  className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Clock className="h-3 w-3" />
                  Check-in: 3:00 PM · Check-out: 11:00 AM
                </motion.span>
              </div>
            ) : (
              <span>Select check-in and check-out dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={{
              from: startDate as Date,
              to: endDate as Date,
            }}
            onSelect={(range) => {
              if (range?.from) {
                handleSelect(range.from);
                if (range.to) {
                  handleSelect(range.to);
                }
              }
            }}
            initialFocus
            numberOfMonths={1}
            disabled={(date) => date < new Date()}
          />
          <div className="p-3 border-t">
            <div className="text-xs text-muted-foreground">
              <div className="font-medium text-foreground mb-1">{propertyName}</div>
              <div className="flex gap-2">
                <span>Check-in: 3:00 PM</span>
                <span>·</span>
                <span>Check-out: 11:00 AM</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
