'use client';

import React, { useEffect, useRef } from 'react';
import gsap from "gsap"

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(btnRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.to(btnRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <div ref={containerRef} className="flex  flex-col items-center justify-center text-center px-4 mt-12 mb-16 md:mt-20 md:mb-10 max-w-4xl mx-auto">
      <h1 
        ref={titleRef}
        className="font-copperplate text-4xl md:text-6xl lg:text-[64px] leading-tight md:leading-[1.13em] tracking-[0.02em] text-black uppercase mb-6"
      >
        You Belong<br className="hidden md:block" /> here
      </h1>
      
      <div className="max-w-[506px] mx-auto mb-8">
        <p 
          ref={subtitleRef}
          className="font-arial text-lg md:text-2xl leading-[1.15em] text-black"
        >
          Explore our journey, our heart for the truth, and find a community where you truly belong.
        </p>
      </div>

      <button
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-black text-white px-8 py-3 rounded-[40px] font-arial text-xl md:text-2xl flex items-center border border-black hover:text-black justify-center gap-2 hover:bg-transparent transition-colors"
      >
        Explore
      </button>
    </div>
  );
};

export default AboutHero;
