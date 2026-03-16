"use client";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const SermonHero = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-gray-800"
        style={{ backgroundImage: "url('/img/sermon/sermon-hero.png')" }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-copperplate text-white uppercase tracking-[0.02em] leading-[1em]
                     text-4xl md:text-6xl mb-6"
        >
          sermons & messages
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-white-dim text-lg lg:text-body-text-lg leading-[1.15em] max-w-2xl mb-8"
        >
          Get access to uplifting messages that inspires your faith and deepens
          your relationship with God. Think of it as a spiritual buffet; there’s
          something prepared specifically for you, and it is good for your soul.
        </motion.p>

        {/* <div className="w-full max-w-md">
          <input
            type="search"
            placeholder="Search sermons..."
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none w-full"
          />
        </div> */}
      </div>
    </div>
  );
};
