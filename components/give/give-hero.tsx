"use client";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export const GiveHero = () => {
  return (
    <div className="relative w-full h-screen min-180 flex items-center lg:px-20  overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url(/img/give/hero.png)" }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col  px-4 max-w-5xl  mt-20">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-bold text-white uppercase tracking-hero-heading leading-[1em]
<<<<<<< HEAD
                     text-4xl md:text-6xl  mb-6"
=======
                     text-4xl md:text-6xl lg:text-hero-heading mb-6"
>>>>>>> 5c0d89c7fa65fb254bfa94acdd5c38f77e7b8704
        >
          Giving
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-white-dim text-body-text lg:text-body-text-lg leading-[1.15em] mb-12"
        >
          To give is an act of worship ,We give to Build the Kingdom of God
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button
            variant="black"
            className="w-44 h-14 text-lg font-bold font-body"
          >
            Online Giving
          </Button>

          <Button
            variant="primary"
            className="w-44 h-14 text-lg font-bold font-body"
          >
            Bank Transfer
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
