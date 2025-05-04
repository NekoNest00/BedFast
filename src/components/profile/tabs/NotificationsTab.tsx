
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  bookingReminders: boolean;
  checkInAlerts: boolean;
  promotions: boolean;
}

interface NotificationsTabProps {
  notificationSettings: NotificationSettings;
  handleNotificationToggle: (setting: string) => void;
}

export default function NotificationsTab({
  notificationSettings,
  handleNotificationToggle,
}: NotificationsTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <p className="text-muted-foreground">
          Choose how you want to be notified about activity and updates
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Email Notifications</TableCell>
              <TableCell className="text-right">
                <Switch 
                  checked={notificationSettings.email}
                  onCheckedChange={() => handleNotificationToggle('email')}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Push Notifications</TableCell>
              <TableCell className="text-right">
                <Switch 
                  checked={notificationSettings.push}
                  onCheckedChange={() => handleNotificationToggle('push')}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Booking Reminders</TableCell>
              <TableCell className="text-right">
                <Switch 
                  checked={notificationSettings.bookingReminders}
                  onCheckedChange={() => handleNotificationToggle('bookingReminders')}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Check-in Alerts</TableCell>
              <TableCell className="text-right">
                <Switch 
                  checked={notificationSettings.checkInAlerts}
                  onCheckedChange={() => handleNotificationToggle('checkInAlerts')}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Promotional Offers</TableCell>
              <TableCell className="text-right">
                <Switch 
                  checked={notificationSettings.promotions}
                  onCheckedChange={() => handleNotificationToggle('promotions')}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
