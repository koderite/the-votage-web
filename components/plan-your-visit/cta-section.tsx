'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export function CTASection() {
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  return (
    <motion.div
      className="w-full bg-backround py-16 md:py-20 lg:py-24 px-6 md:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[850px] mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-[36px] font-copperplate md:text-[42px] lg:text-[48px] font-bold tracking-tight leading-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          STILL HAVE QUESTIONS?
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-body-text-lg text-foreground leading-body-text-lg mb-8 md:mb-10 max-w-[700px] mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          We'd love to hear from you! reach out to us with your prayers questions and more questions regarding church.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            onClick={handleContactClick}
            className="px-14 py-3.5 font-copperplate border-[2.5px] border-black rounded-full text-[13px] text-black md:text-[14px] font-semibold tracking-[0.08em] uppercase bg-cream hover:bg-black hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            CONTACT US
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
