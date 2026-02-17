import Image from "next/image";
import React from "react";

export default function WhereGiving() {
  return (
    <div className="min-h-50 pt-8 bg-white">
      {/* Section Header */}
      <div className="mb-8 position-relative mx-auto w-fit">
        <h2 className="font-display text-center text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
          Where Your giving Goes to
        </h2>
        <Image
          src="/img/give/stroke.svg"
          alt="Bank Logo"
          width={30}
          height={30}
          className="mb-4"
        />
      </div>
    </div>
  );
}
