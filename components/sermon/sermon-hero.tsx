"use client";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

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
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto py-24 md:py-32">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-copperplate text-white uppercase tracking-[0.02em] leading-[1.05] text-4xl md:text-6xl mb-6"
        >
          sermons & <br /> messages
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-body text-white-dim text-lg lg:text-2xl leading-relaxed max-w-2xl mb-10"
        >
          Get access to uplifting messages that inspire your faith and deepen
          your relationship with God. Think of it as a spiritual buffet; there’s
          something prepared specifically for you, and it is good for your soul.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="w-full max-w-xs"
        >
          <Button
            className="font-copperplate bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-full transition-colors w-full"
            onClick={() => {
              const section = document.getElementById("messages");
              section?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            View sermons
          </Button>
        </motion.div>
      </div>

      {/* Decorative floating orbs */}
      <motion.div
        className="absolute top-10 right-10 w-44 h-44 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};
