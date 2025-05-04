
import React from "react";

interface PriceSummaryProps {
  nights: number;
  pricePerNight: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  total: number;
}

export default function PriceSummary({
  nights,
  pricePerNight,
  subtotal,
  cleaningFee,
  serviceFee,
  total,
}: PriceSummaryProps) {
  if (nights <= 0) return null;
  
  return (
    <div className="space-y-3 mb-4">
      <div className="flex justify-between text-sm">
        <span>${pricePerNight} x {nights} nights</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Cleaning fee</span>
        <span>${cleaningFee}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Service fee</span>
        <span>${serviceFee}</span>
      </div>
      <div className="flex justify-between font-semibold pt-2 border-t">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
