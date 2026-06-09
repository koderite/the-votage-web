"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

export const WatchLiveSection = () => {
  const videoId = "KC3-UJNrRY4";
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    setShowOverlay(false);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube iframe - always present */}
      <iframe
        key={showOverlay ? "no-autoplay" : "autoplay"}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${showOverlay ? 0 : 1}&modestbranding=1&rel=0&enablejsapi=1}`}
        title="Watch Live Stream"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />

      {/* Transparent overlay with opacity - hides when clicked */}
      {showOverlay && (
        <motion.div
          className="absolute inset-0 bg-black/60 cursor-pointer z-10"
          onClick={handlePlay}
          whileHover="hover"
        >
          {/* Centered Watch Live content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* YouTube Icon */}
            <motion.div
              className="w-30 h-30 rounded-full bg-brand-red flex items-center justify-center shadow-2xl mb-6"
              variants={{ hover: { scale: 1.1 } }}
            >
              <Youtube className="lg:w-20 lg:h-20 size-12 sm:size-15 text-[#FF0000]" />
            </motion.div>

            {/* Watch Live Text */}
            <motion.p
              className="text-white font-copperplate text-3xl lg:text-5xl uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Watch Live
            </motion.p>

            {/* <motion.p
              className="text-white/70 font-poppins text-base mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Click to play
            </motion.p> */}
          </div>
        </motion.div>
      )}
    </section>
  );
};
