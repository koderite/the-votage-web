'use client';

import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { useState } from "react";

export function LocationMap() {
  // Coordinates for Airport Road, Benin City, Edo State, Nigeria
  const latitude = 6.2937194;
  const longitude = 5.5880919;
  const address =
    "144, Ogba–Airport Road, Opposite DVD Filling Station, Benin City, Edo State, Nigeria";
  const locationName = "Vintage Church";

  const [mapKey, setMapKey] = useState(0);

  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleViewOnMap = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  const handleRecenter = () => {
    // Reload the iframe to recenter the map
    setMapKey((prev) => prev + 1);
  };

  return (
    <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-copperplate md:text-6xl lg:text-6xl font-bold text-[#1a1a1a] mb-4">
            Find Us
          </h2>
          <p className="text-lg text-[#1a1a1a]/70 max-w-2xl mx-auto">
            Visit us at our location, we'd love to see you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-[#f5f5f3] rounded-3xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-copperplate font-bold text-[#1a1a1a] mb-2">

                    {locationName}
                  </h3>
                  <p className="text-[#1a1a1a]/70 leading-relaxed">
                    {address}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleGetDirections}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#2a2a2a] transition-colors shadow-lg shadow-black/10"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </motion.button>

                <motion.button
                  onClick={handleViewOnMap}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-white text-[#1a1a1a] border-2 border-gray-300 rounded-full font-medium text-sm flex items-center justify-center gap-3 hover:border-gray-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  View on Google Maps
                </motion.button>
              </div>
            </div>

            {/* Decorative floating element */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden lg:block"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-40 blur-2xl" />
            </motion.div>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-black/10 border-4 border-white bg-gray-100">
              {/* Google Maps iFrame */}
              <iframe
                key={mapKey}
                width="100%"
                height="500"
                frameBorder="0"
                style={{ border: 0, display: "block" }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${latitude},${longitude}&t=m&z=17&output=embed`}
                allowFullScreen
                loading="lazy"
                title="Vintage Church Location Map"
              />

              {/* Custom Overlay Label - Now Clickable */}
              <motion.button
                onClick={handleRecenter}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg cursor-pointer hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold font-copperplate text-[#1a1a1a] text-sm">
                      {locationName}
                    </h4>
                    <p className="text-xs text-[#1a1a1a]/60">
                      Click to recenter • Airport Road, Benin City
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LocationMap;
