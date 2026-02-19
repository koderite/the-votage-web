'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const images = [
  {
    id: 0, // Far Left (Duplicate for layout balance)
    url: "/img/about/hero-1.jpg",
    alt: "Community gathering"
  },
  {
    id: 1, // Left
    url: "/img/connect-images.png",
    alt: "Worship service"
  },
  {
    id: 2, // Center (Speaker)
    url: "/img/about/hero-3.jpg",
    alt: "Speaker on stage"
  },
  {
    id: 3, // Right
    url: "/img/about/hero-2.jpg",
    alt: "Community gathering"
  },
  {
    id: 5, // Far Right (Duplicate for layout balance)
    url: "/img/about/hero-4.jpg",
    alt: "Worship service"
  }
];

// Height variants for alternating pattern
const getHeightClass = (index: number) => {
  const heights = [
    'h-[420px] md:h-[480px] lg:h-[520px]', // High
    'h-[340px] md:h-[400px] lg:h-[440px]', // Low
    'h-[460px] md:h-[520px] lg:h-[560px]', // Higher (center)
    'h-[340px] md:h-[400px] lg:h-[440px]', // Low
    'h-[420px] md:h-[480px] lg:h-[520px]', // High
  ];
  return heights[index] || heights[0];
};

export const GallerySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation with staggered reveal
      gsap.from(".gallery-item", {
        y: 150,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.3
      });

      // Subtle continuous float animation for even items
      gsap.to(".gallery-item-even", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });

      // Subtle continuous float animation for odd items (opposite direction)
      gsap.to(".gallery-item-odd", {
        y: 10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Cancel any ongoing animations on the target
    gsap.killTweensOf(e.currentTarget);
    
    // Smooth scale up with enhanced effects
    gsap.to(e.currentTarget, { 
      scale: 1.08, 
      y: -15,
      zIndex: 50,
      boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
      borderRadius: "50px",
      duration: 0.5, 
      ease: "power3.out" 
    });

    // Brighten the image
    const img = e.currentTarget.querySelector('.gallery-image');
    if (img) {
      gsap.to(img, {
        filter: "brightness(1.1)",
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Cancel any ongoing animations on the target
    gsap.killTweensOf(e.currentTarget);
    
    // Return to original state with smooth transition
    gsap.to(e.currentTarget, { 
      scale: 1, 
      y: 0,
      zIndex: 1,
      boxShadow: "0px 4px 6px -1px rgba(0, 0, 0, 0.1)",
      borderRadius: "40px",
      duration: 0.5, 
      ease: "power3.out" 
    });

    // Reset image brightness
    const img = e.currentTarget.querySelector('.gallery-image');
    if (img) {
      gsap.to(img, {
        filter: "brightness(1)",
        duration: 0.3
      });
    }
  };

  const isExternalUrl = (url: string) => url.startsWith('http');

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden py-16 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      
      <div 
        ref={trackRef}
        className="flex justify-center items-end gap-4 md:gap-6 px-4 min-w-max md:min-w-0 relative z-10"
      >
        {images.map((img, index) => (
          <div 
            key={img.id}
            className={`
              gallery-item relative flex-shrink-0 
              w-[240px] md:w-[280px] lg:w-[320px] 
              ${getHeightClass(index)}
              ${index % 2 === 0 ? 'gallery-item-even' : 'gallery-item-odd'}
              rounded-[40px] md:rounded-[50px] 
              overflow-hidden shadow-md cursor-pointer bg-gray-200
              transform-gpu will-change-transform
            `}
            onMouseEnter={(e) => handleMouseEnter(e, index)}
            onMouseLeave={(e) => handleMouseLeave(e, index)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="gallery-image object-cover transition-transform duration-700"
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
              unoptimized={isExternalUrl(img.url)}
            />
            {/* Enhanced overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-300 pointer-events-none" />
            
            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-[40px] md:rounded-[50px] opacity-0 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default GallerySection;
