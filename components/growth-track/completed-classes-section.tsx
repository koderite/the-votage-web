"use client"

import { motion } from 'motion/react';
import { useState } from 'react';
import { CertificateFormModal } from '@/components/gta-form/certificate-form';

export default function CompletedClassesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-white py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-[#fffcf1] rounded-none shadow-[1px_2px_4px_0px_rgba(0,0,0,0.1),5px_6px_8px_0px_rgba(0,0,0,0.09),12px_14px_11px_0px_rgba(0,0,0,0.05),21px_25px_13px_0px_rgba(0,0,0,0.01),33px_38px_14px_0px_rgba(0,0,0,0)] overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="flex flex-col items-center justify-center px-8 py-16 md:px-12 lg:px-16 lg:py-20">
                <motion.div 
                  className="flex flex-col items-center gap-3 max-w-md"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {/* Small heading */}
                  <div className="font-copperplate text-sm md:text-base text-black text-center uppercase tracking-[0.02em]">
                    growth Track academy
                  </div>
                  
                  {/* Main heading */}
                  <div className="font-copperplate text-sub-heading text-black text-center uppercase tracking-[0.02em]">
                    completed classes
                  </div>
                  
                  {/* Description */}
                  <div className="font-body text-body-text-lg text-[#5e5d5d] text-center mt-2">
                    Completed all lessons?Register to get your Certificate.
                  </div>
                  
                  {/* CTA Button */}
                  <motion.button
                    className="bg-white text-black font-body text-body-text px-10 py-4 rounded-[36px] border border-black border-solid shadow-[1px_2px_4px_0px_rgba(0,0,0,0.1),5px_6px_8px_0px_rgba(0,0,0,0.09),12px_14px_11px_0px_rgba(0,0,0,0.05),21px_25px_13px_0px_rgba(0,0,0,0.01),33px_38px_14px_0px_rgba(0,0,0,0)] mt-4 hover:shadow-2xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    claim certificate
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Right Image */}
              <motion.div 
                className="relative h-[400px] md:h-[560px]"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <img 
                  src="/img/gta/section-3.png" 
                  alt="Large group of graduates holding certificates" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificate Form Modal */}
      <CertificateFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
