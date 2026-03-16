'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EnrollmentForm } from '@/components/gta-form/enrollment-form';

export default function EnrollmentPage() {
  const handleSubmit = async (data: any) => {
    // TODO: Implement actual API submission
    console.log('Form data:', data);
    
    // Example API call:
    // const response = await fetch('/api/enrollment', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // if (!response.ok) throw new Error('Submission failed');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section using form-hero */}
      <div className="relative size-full min-h-screen overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              alt="Church community gathering"
              className="absolute h-full left-0 max-w-none top-0 w-full object-cover bg-gray-800"
              src="/img/gta/section-3.png"
            />
          </div>
          <motion.div
            className="absolute bg-[rgba(0,0,0,0.75)] inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Hero Content */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 content-stretch flex flex-col items-center w-full max-w-[965px] z-10 px-6">
          <div className="content-stretch flex flex-col gap-[24px] items-center leading-[0] not-italic relative shrink-0 text-center">
            <motion.div
              className="flex flex-col font-copperplate font-bold justify-center relative shrink-0 text-white tracking-[1.44px] uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <p className="whitespace-pre-wrap text-[48px] md:text-[64px] lg:text-hero-heading leading-[1]">
                GROWTH TRACK
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col font-['Arial',sans-serif] justify-center relative shrink-0 text-[#ebebeb]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <p className="whitespace-pre-wrap text-[18px] md:text-[24px]">
                New Enrollment Form
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-[60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[12px] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-white text-[14px] font-['Arial',sans-serif] tracking-wider uppercase">
            Scroll Down
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Form Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-10 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/growth-track"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Growth Track</span>
          </Link>

          {/* Enrollment Form */}
          <EnrollmentForm />
        </div>
      </section>

      <Footer />
    </div>
  );
}
