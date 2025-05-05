
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Clock } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ViewingAccessCardProps {
  pin: string;
  accessStatus: "active" | "upcoming" | "expired";
  accessEnd: Date;
  accessStart: Date;
  shouldShowPin: boolean;
}

export default function ViewingAccessCard({
  pin,
  accessStatus,
  accessEnd,
  accessStart,
  shouldShowPin
}: ViewingAccessCardProps) {
  const { toast } = useToast();
  
  // Copy PIN to clipboard
  const copyPinToClipboard = () => {
    navigator.clipboard.writeText(pin).then(() => {
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

  return (
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
          {shouldShowPin ? (
            <div className="space-y-2">
              <div className="flex gap-2 justify-center">
                {pin.split('').map((digit, i) => (
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
  );
}
