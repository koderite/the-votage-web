"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Shown only until the latest video is fetched, or if the fetch fails.
const FALLBACK_VIDEO_ID = "KC3-UJNrRY4";

export const WatchLiveSection = () => {
  const [videoId, setVideoId] = useState(FALLBACK_VIDEO_ID);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnail, setThumbnail] = useState(
    `https://img.youtube.com/vi/${FALLBACK_VIDEO_ID}/maxresdefault.jpg`
  );

  // Pull the channel's most recent upload/stream so this always reflects the
  // latest service instead of a hardcoded video.
  useEffect(() => {
    let active = true;
    fetch("/api/latest-video")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.videoId) {
          setVideoId(data.videoId);
          setThumbnail(
            `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`
          );
        }
      })
      .catch(() => {
        /* keep fallback video on error */
      });
    return () => {
      active = false;
    };
  }, []);

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
