"use client";
import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="relative w-full h-screen min-h-200 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 bg-gray-800"
        style={{ backgroundImage: "var(--hero-pattern)" }}
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-copperplate font-bold text-white uppercase tracking-[0.02em] leading-[1em]
                     text-4xl md:text-6xl lg:text-hero-heading mb-6"
        >
          A generation <br className="hidden md:block" />
          rooted in truth
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-white-dim text-lg md:text-2xl leading-[1.15em] max-w-2xl mb-12"
        >
          We exist to share the life-giving message of Jesus and raise devoted
          followers of Christ.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/plan-your-visit">
            <Button
              variant="primary"
              className="w-44 h-14 text-lg font-bold font-body"
            >
              Join us
            </Button>
          </Link>

          <Button
            variant="outline"
            className="w-44 h-14 text-lg font-bold font-body"
          >
            Get inspired
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
