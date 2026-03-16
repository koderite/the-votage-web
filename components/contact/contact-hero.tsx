"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function ContactHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{
            backgroundImage: ` url(/img/contact/hero.png)`,
          }}>
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div
          className="w-full h-full  bg-cover inset-0 absolute bg-center bg-black/40"
          
        />
      </motion.div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen px-8 md:px-16 lg:px-24">
        <div className="max-w-2xl pt-20">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-4xl lg:text-6xl font-copperplate font-bold tracking-tight mb-6 text-[#FFFDD0]"
          >
            <motion.span
              className="inline-block"
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 },
              }}
            >
              STAY
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              whileHover={{
                scale: 1.05,
                rotate: [1, -1, 1, 0],
                transition: { duration: 0.3 },
              }}
            >
              IN
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              whileHover={{
                scale: 1.05,
                rotate: [-1, 1, -1, 0],
                transition: { duration: 0.3 },
              }}
            >
              TOUCH
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#FFFDD0] mb-8 max-w-xl leading-relaxed"
          >
            We'd love to hear from you! reach out to us with your prayers
            questions and more questions regarding church.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative px-12 py-4 bg-[#FFFDD0] text-black rounded-full text-base font-medium overflow-hidden group"
            >
              <motion.span
                className="relative font-bold z-10"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Send A Message
              </motion.span>

              {/* Button Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </motion.div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute -right-20 top-1/4 w-4 h-4 bg-[#FFFDD0] rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -left-10 bottom-1/4 w-6 h-6 border-2 border-[#FFFDD0]/20 rounded-full"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-6 h-10 border-2 border-[#FFFDD0]/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-[#FFFDD0]/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ContactHero;
