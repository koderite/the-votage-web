"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";

export const WatchLiveSection = () => {
  const videoId = "KC3-UJNrRY4";
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  );

  return (
    <section className="relative w-full aspect-video lg:aspect-auto lg:h-screen flex items-center justify-center overflow-hidden bg-black">
      {isPlaying ? (
        /* iframe is only mounted after the user clicks, so YouTube's native
           play button never shows through the overlay */
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&enablejsapi=1`}
          title="Watch Live Stream"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <motion.div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setIsPlaying(true)}
          whileHover="hover"
          role="button"
          tabIndex={0}
          aria-label="Play live stream"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsPlaying(true);
            }
          }}
        >
          {/* Video thumbnail */}
          <Image
            src={thumbnail}
            alt="Watch Live Stream"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onError={() =>
              setThumbnail(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
            }
          />

          {/* Darkening layer */}
          <div className="absolute inset-0 bg-black/60" />

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
          </div>
        </motion.div>
      )}
    </section>
  );
};
