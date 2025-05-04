
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingsTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and security settings
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Language</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span>English (US)</span>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Password</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span>••••••••••••</span>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Danger Zone</h3>
          <div className="rounded-lg border border-destructive/20 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete your account and all associated data.
                </p>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
