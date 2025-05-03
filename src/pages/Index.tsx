
import React, { useState } from "react";
import Layout from "../components/Layout";
import PropertyCard, { Property } from "../components/PropertyCard";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { ChevronRight, Filter } from "lucide-react";

export default function Index() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Mock property data
  const mockProperties: Property[] = [
    {
      id: "prop1",
      name: "Modern Downtown Apartment",
      location: "Downtown, New York",
      price: 149,
      rating: 4.92,
      images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3"],
      instant: true,
    },
    {
      id: "prop2",
      name: "Luxury Beach House",
      location: "Malibu, California",
      price: 299,
      rating: 4.87,
      images: ["https://images.unsplash.com/photo-1502005097973-6a7082348e28?ixlib=rb-4.0.3"],
      instant: true,
    },
    {
      id: "prop3",
      name: "Mountain View Cabin",
      location: "Aspen, Colorado",
      price: 179,
      rating: 4.95,
      images: ["https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3"],
      instant: false,
    },
    {
      id: "prop4",
      name: "Downtown Loft",
      location: "Chicago, Illinois",
      price: 129,
      rating: 4.81,
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3"],
      instant: true,
    },
  ];

  // Categories for filtering
  const categories = ["All", "Instant", "Urban", "Beach", "Mountain", "Lake"];

  return (
    <Layout>
      <div className="container-app">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">BedFast</h1>
            <p className="text-sm text-muted-foreground">Find and access homes instantly</p>
          </div>
          <ThemeToggle />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-pill whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {category}
              </button>
            ))}
            <button className="p-2 rounded-full bg-muted">
              <Filter size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Featured collection */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured Stays</h2>
            <button className="flex items-center text-sm text-muted-foreground">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Instant access collection */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Instant Access</h2>
            <button className="flex items-center text-sm text-muted-foreground">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockProperties
              .filter(p => p.instant)
              .map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
