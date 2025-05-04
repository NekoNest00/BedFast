
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

interface PersonalInfoTabProps {
  personalInfo: PersonalInfo;
  handlePersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePersonalInfo: () => void;
}

export default function PersonalInfoTab({
  personalInfo,
  handlePersonalInfoChange,
  handleSavePersonalInfo,
}: PersonalInfoTabProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <p className="text-muted-foreground">
          Update your personal details and contact information
        </p>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User size={16} /> Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} /> Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin size={16} /> Address
            </Label>
            <Input
              id="address"
              name="address"
              value={personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSavePersonalInfo}>Save Changes</Button>
      </div>
    </div>
  );
}
