"use client";

import { Landmark } from "lucide-react";
import { Button } from "../ui/button";
import InternationalPayment from "./international-payment";
import LocalPayment from "./local-payment";

export default function JoinMission() {
  return (
    <section className="w-full py-12 md:py-16 px-4 bg-white lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
                Join the Mission Through Giving
              </h2>
            </div>
          </div>
          <p className="font-body text-gray-700 text-xs md:text-sm max-w-3xl mx-auto text-center">
            We give because generosity is the heart of God and the center of our
            Faith. Every giving helps spread the Gospel, builds lives, and
            sustains the vision God has entrusted to the Ministry. Your giving
            is more than a donation, Its an investment in transformed lives and
            global impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InternationalPayment />

          <LocalPayment />
        </div>
      </div>
    </section>
  );
}
