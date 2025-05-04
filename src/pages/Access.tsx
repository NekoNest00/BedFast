import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Key, LockKeyhole, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { format, isBefore, isAfter } from "date-fns";
import { motion } from "framer-motion";

// Mock data for now - in real app would come from API
const accessEntries = [
  {
    id: "booking1",
    propertyName: "Modern Downtown Apartment",
    location: "Downtown, New York",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    accessStart: "2025-05-10T15:00:00",
    accessEnd: "2025-05-15T11:00:00",
    isActive: true,
  },
  {
    id: "booking2",
    propertyName: "Luxury Beach House",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3",
    accessStart: "2025-06-15T15:00:00",
    accessEnd: "2025-06-20T11:00:00",
    isActive: false,
  }
];

export default function Access() {
  const { user } = useAuth();
  
  const getAccessStatus = (entry: typeof accessEntries[0]) => {
    const now = new Date();
    const start = new Date(entry.accessStart);
    const end = new Date(entry.accessEnd);
    
    if (isAfter(now, start) && isBefore(now, end)) {
      return "active";
    } else if (isBefore(now, start)) {
      return "upcoming";
    } else {
      return "expired";
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container-app flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="flex flex-col items-center text-center max-w-xs">
            <Key size={48} className="text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No access yet</h2>
            <p className="text-muted-foreground mb-6">Sign in to view and manage your property access</p>
            <button className="btn-primary w-full">Login</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-app py-6">
        <h1 className="text-2xl font-bold mb-6">Property Access</h1>
        
        <div className="space-y-4">
          {accessEntries.map((entry) => {
            const status = getAccessStatus(entry);
            return (
              <Card key={entry.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/access/${entry.id}`} className="flex h-full">
                  <div className="w-1/3 aspect-square">
                    <img
                      src={entry.image}
                      alt={entry.propertyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">{entry.propertyName}</h3>
                        {status === "active" && (
                          <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
                        )}
                        {status === "upcoming" && (
                          <Badge variant="outline" className="border-amber-500 text-amber-500">Upcoming</Badge>
                        )}
                        {status === "expired" && (
                          <Badge variant="outline" className="border-gray-400 text-gray-400">Expired</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{entry.location}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {format(new Date(entry.accessStart), "MMM d, h:mm a")} - {format(new Date(entry.accessEnd), "MMM d, h:mm a")}
                        </span>
                      </div>
                    </div>
                    
                    {status === "active" && (
                      <div className="flex items-center gap-2 mt-4">
                        <motion.div 
                          className="text-green-500 flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <LockKeyhole size={16} />
                          <span className="text-sm">Access Available</span>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
            );
          })}
          
          {accessEntries.length === 0 && (
            <div className="text-center py-16">
              <LockKeyhole size={32} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You don't have any access yet</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
