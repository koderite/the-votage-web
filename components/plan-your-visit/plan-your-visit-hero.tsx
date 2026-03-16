'use client';

import { motion } from 'motion/react';

export function PlanYourVisitHero() {
  return (
    <div 
      className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen bg-cover bg-center bg-no-repeat bg-gray-800"
      style={{ backgroundImage: `url(/img/plan-your-visit/hero-bg.png)` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content Container */}
      <div className="relative h-full w-full flex items-center justify-start">
        <div className="w-full max-w-350 mx-auto px-8 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Heading */}
            <h1 className="text-white font-copperplate text-[40px] md:text-[64px] font-bold tracking-tight leading-[1.1] mb-6">
              PLAN YOUR VISIT
            </h1>

            {/* Subheading */}
            <p className="text-white text-[18px] md:text-[20px] leading-relaxed mb-10 max-w-150">
              We're thrilled you're here! Let us help make your first visit to The Votage an Amazing Experience.
            </p>

            {/* CTA Button */}
            <button className="bg-black font-copperplate text-white px-10 py-4 rounded-full text-[15px] font-semibold tracking-wide uppercase hover:bg-black/90 transition-all duration-300 cursor-pointer">
              I'M COMING
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
