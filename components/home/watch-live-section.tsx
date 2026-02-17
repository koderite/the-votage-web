"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

export const WatchLiveSection = () => {
  const videoId = 'RXT3Cdv19cs';
  const [showOverlay, setShowOverlay] = useState(true);
  
  const handlePlay = () => {
    setShowOverlay(false);
  };
  
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube iframe - always present */}
      <iframe
        key={showOverlay ? 'no-autoplay' : 'autoplay'}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${showOverlay ? 0 : 1}&modestbranding=1&rel=0&enablejsapi=1`}
        title="Watch Live Stream"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
      
      {/* Transparent overlay with opacity - hides when clicked */}
      {showOverlay && (
        <div 
          className="absolute inset-0 bg-black/60 cursor-pointer z-10"
          onClick={handlePlay}
        >
          {/* Centered Watch Live content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* YouTube Icon */}
            <motion.div
              className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center shadow-2xl mb-6 hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
            >
              <Youtube className="w-12 h-12 text-white" fill="white" />
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
            
            <motion.p
              className="text-white/70 font-poppins text-lg mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Click to play
            </motion.p>
          </div>
        </div>
      )}
    </section>
  );
};
