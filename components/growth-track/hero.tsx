"use client"

import { motion } from "motion/react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-black"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%), url(/img/gta/hero-bg.png)`,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-20 w-full">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Heading */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
            >
              <h1 className="font-copperplate text-white uppercase tracking-[0.02em] leading-[1.125] text-xl sm:text-[50px] lg:text-6xl">
                GROWTH TRACK
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut",
              }}
            >
              <p className="font-copperplate text-white uppercase tracking-[0.02em] leading-[1.125] text-[40px] sm:text-[48px] lg:text-4xl opacity-95">
                Discipling believers and raising leaders.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: "easeOut",
              }}
            >
              <motion.button
                className="bg-white text-black font-['Arial',sans-serif] px-10 py-4 rounded-full text-[20px] leading-[1.2] hover:shadow-2xl transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('next-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Apply now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}
