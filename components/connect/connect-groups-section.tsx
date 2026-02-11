"use client";

import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse" />;
}

export default function ConnectGroupsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const groups = [
    {
      id: 1,
      name: "KABOO TRYBE",
      day: "Tuesdays",
      location: "143 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 2,
      name: "NEWNESS TRYBE",
      day: "Tuesdays",
      location: "342 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 3,
      name: "UGBOWO TRYBE",
      day: "Tuesdays",
      location: "142 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
    {
      id: 4,
      name: "KABOO TRYBE",
      day: "Tuesdays",
      location: "142 Airport Road, Ajao ADP Junction",
      time: "5:00pm",
    },
  ];

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
    <section className="bg-[#FFF8F0] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        
        {/* Header with Navigation */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
              <h2 className="font-copperplate text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight uppercase">
                FIND A CONNECT THAT FITS INTO<br />
                YOUR SCHEDULE
              </h2>
            </div>
          </div>
          <p className="font-body text-gray-700 text-xs md:text-sm max-w-3xl mx-auto text-center">
            Browse through connect groups, more than words, they define our identity and guide how we live, love, serve, and grow as a community.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3 justify-end mb-8">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-12 h-12 rounded-full border border-black/50 flex items-center justify-center transition-colors duration-300 focus:outline-none ring-1 ring-black ${
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

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 lg:-mx-20 lg:px-20 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative flex-shrink-0 w-[85vw] md:w-[400px] h-[500px] rounded-lg overflow-hidden group cursor-pointer snap-center"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/img/connect-images.png"
                  alt={group.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Arrow Icon - Larger and more visible */}
              <button className="absolute top-4 right-4 hover:opacity-80 transition-opacity z-10">
                <svg className="w-12 h-12 text-white drop-shadow-lg" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.3959 68.1616C24.5383 62.4535 19.5664 48.2515 25.2745 36.3938C30.9826 24.5362 45.1847 19.5643 57.0423 25.2724C68.8999 30.9805 73.8718 45.1826 68.1637 57.0402C62.4556 68.8978 48.2535 73.8698 36.3959 68.1616ZM55.8278 27.7953C45.3578 22.7552 32.8375 27.1383 27.7974 37.6083C22.7572 48.0784 27.1404 60.5986 37.6104 65.6388C48.0804 70.6789 60.6007 66.2957 65.6408 55.8257C70.681 45.3557 66.2978 32.8354 55.8278 27.7953Z" fill="currentColor"/>
                  <path d="M56.1551 53.9013L50.7252 38.3911L35.215 43.821L34.2992 41.2048L52.4255 34.859L58.7713 52.9854L56.1551 53.9013Z" fill="currentColor"/>
                  <path d="M50.3145 36.0176L52.8373 37.2321L42.5142 58.6767L39.9913 57.4622L50.3145 36.0176Z" fill="currentColor"/>
                </svg>
              </button>
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Content with backdrop */}
              <div className="absolute bottom-0 left-0 right-0">
                {/* Transparent glass backdrop behind text */}
                <div className="bg-white/20 backdrop-blur-sm p-6">
                  <h3 className="font-display text-white font-black mb-3 text-lg uppercase leading-tight drop-shadow-lg">
                    {group.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white flex-shrink-0 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <p className="font-body text-white text-sm drop-shadow">{group.day}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5 drop-shadow" />
                      <p className="font-body text-white/90 text-sm leading-tight drop-shadow">{group.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white flex-shrink-0 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <p className="font-body text-white text-sm drop-shadow">{group.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
