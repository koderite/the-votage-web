"use client"
import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const cards = [
  {
    id: 1,
    category: 'WHO WE ARE',
    title: 'ABOUT US',
    link: '/about',
    image: '/img/belong-1.jpg',
  },
  {
    id: 2,
    category: 'OUR CONNECT GROUP',
    title: 'JOIN A CONNECT',
    link: '/connect',
    image: '/img/belong-2.png',
  },
  {
    id: 3,
   title : 'GROWTH TRACK',
   category : 'GROW IN YOUR FAITH',   image: '/img/sermon/sermon1.jpg', 
       link: '/growth-track',

  },
  {
    id: 4,
   title : 'SERMONS',
   category : 'WATCH & LISTEN',
    image: '/img/connect/connect1.jpg',
        link: '/sermons',


  }
];

export const BelongSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 420; // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Update scroll button states
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      updateScrollButtons();
      
      // Listen for scroll events
      container.addEventListener('scroll', updateScrollButtons, { passive: true });
      
      // Also check on resize
      window.addEventListener('resize', updateScrollButtons, { passive: true });
      
      return () => {
        container.removeEventListener('scroll', updateScrollButtons);
        window.removeEventListener('resize', updateScrollButtons);
      };
    }
  }, []);

  return (
    <section className="bg-white/98 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-copperplate font-bold text-3xl lg:text-[48px] text-black uppercase mb-2">
              You Belong Here!
            </h2>
            <p className="font-body text-lg lg:text-2xl text-black">
              Real Word, Real People Relevant Relationships
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border border-black/50 flex items-center justify-center transition-colors duration-300 focus:outline-none  ring-1 ring-black ${
                canScrollLeft 
                  ? 'bg-black hover:text-white cursor-pointer' 
                  : 'opacity-90 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className={`w-6 ${
                canScrollLeft 
                  ? 'text-white' 
                  : 'text-black'
              } h-6`} />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border border-black/50 flex items-center justify-center transition-colors duration-300 focus:outline-none ring-1 ring-black ${
                canScrollRight 
                  ? 'bg-black hover:text-white cursor-pointer' 
                  : 'opacity-90 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className={`w-6 ${
                canScrollRight 
                  ? 'text-white' 
                  : 'text-black'
              } h-6`} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 lg:-mx-20 lg:px-20 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => card.link && router.push(card.link)}
              className="relative flex-shrink-0 w-[85vw] md:w-[400px] h-[500px] rounded-lg overflow-hidden group cursor-pointer snap-center"
            >
              {/* Background Image */}
              <div 
                className={`absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110`}
                style={{ 
                  backgroundImage: `url(${card.image})`,
                  backgroundPosition: index >= 2 ? 'center 50% ' : 'center center'
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <p className="font-body font-bold text-body-text text-white/90 mb-2 uppercase tracking-wider">
                    {card.category}
                  </p>
                  <h3 className="font-body font-bold text-3xl text-white leading-tight uppercase">
                    {card.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 group/btn">
                  <span className="font-body font-bold text-base text-white">Learn More</span>
                  <ArrowRight className="w-5 h-5 text-white transition-transform group-hover/btn:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
