import React from "react";
import TransferCard from "./transfer-card";
import { transferData } from "./transfer-data";

export default function InternationalTransfer() {
  return (
    <section className="w-full py-12 md:py-16 px-4 bg-white lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="font-display text-center text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
            International Transfer
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-8">
          <TransferCard
            data={transferData.USD}
            accent="bg-yellow-50"
            bordercolor="#B0B000"
          />
          <div className="md:mt-8">
            <TransferCard
              data={transferData.GBP}
              accent="bg-blue-50"
              bordercolor="#0000FF"
            />
          </div>
          <TransferCard
            data={transferData.EUR}
            accent="bg-purple-50"
            bordercolor="#800080"
          />
        </div>
      </div>
    </section>
  );
}
