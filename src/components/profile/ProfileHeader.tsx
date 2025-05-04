
import React from "react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle";

export default function ProfileHeader() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <ThemeToggle />
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-brand-teal to-brand-red/80">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150"}
            alt={user?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-muted-foreground text-sm">{user?.email}</p>
        </div>
      </div>
    </>
  );
}
