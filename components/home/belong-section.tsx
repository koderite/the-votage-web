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
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/423e/b026/efbe57a7d304cf8c706b8119f87565fd?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FQ6hN-nq~0IYab8VZHSAipRLSTnxQbgX6xX9Az9PuCC-jegUSH9gV~7i3JXYAu9U9EO6xt3k~Nedj-ghChTJQ~5CXt1A~3vp49vNHDj0DR8m6sjsmhSM4u~tJJaqO0pG4qDHIk78cWVcZOa3BjsNIxZdIZ0LOLgeO4XnoTtp-eAoVQR-qIHRayr1WCiSCm6tmsVttrSXxndxXStBpWf8T0bzEIIx78G6lOXaR3NHfYeKH8~zod1-96~HQyu8yoKcerD2pK-WDRexMlMtWx2M1Odu0UoloxS9eCQDLOB1pUnXlpb8nr2HNBTNTmpivdW7pB0XslFzGDvNNtpTIv9dNg__',
  },
  {
    id: 2,
    category: 'OUR CONNECT GROUP',
    title: ' Join a Connect',
    link: '/connect',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/2f4d/0d16/e8c2f6271f3960aaeece2722a8160a56?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cLAFlNcjEDmzW0j6Oy-QNkXCjojB-LKOCsqYXaAka05n6o7aVliteP2p6dpGv0J8izt3Uw1ZQZgzsvOT6LXb-MK8MaAn9gfFhONDLpBnfnbRK4Q~-43mekj~We~jiGSUoWVVBb0rfq7gPcZ7S8x3GfOvRsClLcByGPjEFz4L9ivBOP4o64j2SWYomv4SYNKlRRiUj1tytheWCVxjdm7QUlLwRnewFfmCbmphREAwUhAu4QTS5FSeomKcMdH9w0i1olN9SFpyVrRjtUCNjlQv2mJsqy1T0-Sy~VeX8Ydues32MEFXYw-nulMX-KhW7vqcUzhyAlefQFDZBUFnWiPcJQ__',
  },
  
  {
    id: 3,
    category: 'OUR Family GROUPS',
    title: 'Family Life',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/2df2/e46b/fffd435ee1ae1739e0d2d2295de07516?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i3Q-1mtljrJm57Ieblo8~-zyIArqfrJLoJW-SC0WLDtA4Rfk-MXxSGodWfSO03q744sXP677HYQUfQenJUJPTvqO3ySP7l1yklD618AF~EmWuga7Bg0xb3kgcb6W4-Cu4SwmC8NIxkG9TST-T2lTTlwDCb35WHosB2JvcbWl9PHPy2skvUYKsJ5pxchajvcJ9A4tnmvyQASXDkbbsExm1S~N5dozkVgktHWS0fZ7n-0tnPmwiTnafzgCXqtUSef-HTSJOaUr3CgpmVdBYfJz4qbMsEpZ4d9dGgvQPfEwJZjB7geifvrkHVtn6MKvxqK7SgrViiX~VzzSeCHqwn8jlg__',
  },
  {
    id: 4,
    category: 'OUR COUPLES',
    title: '2 in 1',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/b1ed/ef7d/f549da2a0348ff07efee1652fc2d70c3?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WeDhQoN0cR2zAqDI7zq9MTLqYG-d~o8zs-DeyCGPHDu77GS00BHXQyPv0ZL1VU3iXABPZ2uGopeD02v6ilh1j4XmdqU9I175LTiVraTbmzErCejvpvSpqfMTd-rmbGOqsr4xtR2meS9o22K-EI3Ll-c1eBcPNzLARW1ImPTR6BL0ZebKDt98vlG8RmQ7ZkGvo0GHIIXVsNuMOb0xO3JD4TBv3mGb1GySZ2Ze5MkYrUtNy3AY-6n9e-zgW4d1Ol~oQ-3M~oWG-Huo0i6X7nEXagkhPIN-YfZUq6ZfvSAB4WHQIo9VIKZJaZvk-c1WrMwa18kELpcmI0MbatAI2GzjOQ__',
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
            <h2 className="font-copperplate font-bold text-3xl lg:text-[40px] text-black uppercase mb-2">
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
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <p className="font-copperplate font-bold text-sm text-white/90 mb-2 uppercase tracking-wider">
                    {card.category}
                  </p>
                  <h3 className="font-copperplate font-bold text-3xl text-white leading-tight uppercase">
                    {card.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 group/btn">
                  <span className="font-copperplate font-bold text-base text-white">Learn More</span>
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
