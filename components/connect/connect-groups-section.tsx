"use client";

import Image from "next/image";
import { MapPin, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ConnectGroupsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatWhatsAppNumber = (number: string) => number.replace(/[^0-9]/g, "");
  const groups = [
    {
      id: 1,
      name: "KABOD CONNECT",
      day: "Tuesdays",
      location: "The Winlos Center, Airport Road Extension",
      time: "5:00pm",
      image: "/img/connect-images.png",
      leader: "Pst Tobi Tijani",
      whatsapp: "+234 904 535 4864",
      message: "Welcome to KABOD CONNECT! Experience the glory of God's presence in our Tuesday gatherings. We're committed to building a community where faith, fellowship, and growth intersect. Join us as we explore God's word and grow together in Christ.",
    },
    {
      id: 2,
      name: "NEWNESS CONNECT",
      day: "Wednesdays",
      location: "The Winlos Center, Airport Road Extension",
      time: "5:00pm",
      image: "/img/connect-6.jpg",
      leader: "Pst Happysteve Agbonghale",
      whatsapp: "+234 809 417 0863",
      message: "NEWNESS CONNECT welcomes you! Every Wednesday, we gather to experience the transformative power of Christ's love. Whether you're new to our community or looking to deepen your faith, you'll find acceptance, encouragement, and purposeful connections here.",
    },
    {
      id: 3,
      name: "GATEKEEPERS CONNECT",
      day: "Thursdays",
      location: "The Winlos Center, Airport Road Extension",
      time: "5:00pm",
      image: "/img/connect-4.jpg",
      leader: "Pst Blessing Ochade",
      whatsapp: "+234 706 699 5249",
      message: "Welcome to GATEKEEPERS CONNECT! As gatekeepers of God's kingdom, we gather to pray, intercede, and stand in faith for our community. Join our Wednesday meetings to be part of something powerful and transformative.",
    },
   
    {
      id: 4,
      name: "FLORISH CONNECT",
      day: "Fridays",
      location: "The Winlos Center, Airport Road Extension",
      time: "5:00pm",
      image: "/img/connect-3.jpg",
      leader: "Pst Osaretin Osarumwense ",
      whatsapp: "+234 805 928 1336",
      message: "FLORISH CONNECT invites you to Thursday nights filled with God's presence and community love. We believe in flourishing together—spiritually, emotionally, and relationally. Experience a connect group where your growth matters and your voice is heard.",
    },
     {
      id: 5,
      name: "UGBOWO CONNECT",
      day: "Fridays",
      location: "The Orchard Garden",
      time: "5:00pm", 
      image: "/img/connect-1.jpg",
      leader: "Min Petry Ebhonu  ",
      whatsapp: "+234 813 613 2716",
      message: "Join UGBOWO CONNECT for meaningful Friday evening gatherings! Led by our passionate team, we create an atmosphere of authentic worship, biblical teaching, and genuine community. Come as you are and discover your purpose in God's kingdom.",
    },
    {
      id: 6,
      name: "KOINONIA CONNECT",
      day: "Saturdays",
      location: "The Winlos Center, Airport Road Extension",
      time: "5:00pm",
      image: "/img/connect-9.jpg",
      leader: "Pst Obianuju Okpala ",
      whatsapp: "+234 814 547 7860",
      message: "KOINONIA—true fellowship awaits you on Saturday! Our connect group is built on the foundation of genuine Christian community, where we share our lives, support one another, and grow in grace together. Experience authentic koinonia with us.",
    },
    {
      id: 7,
      name: "EKEHUAN CONNECT",
      day: "Saturdays",
      location: "Education Field",
      time: "5:00pm",
      image: "/img/connect-11.jpg",
      leader: "Min Petry Ebhonu",
      whatsapp: "+234 813 613 2716",
      message: "EKEHUAN CONNECT brings you Friday gatherings saturated with God's word and fervent prayer. Led by passionate believers, we're dedicated to creating a space where faith is strengthened, lives are changed, and God's kingdom advances.",
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
    <section id="connect-groups" className="bg-[#FFF8F0] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-360 mx-auto px-6 lg:px-20">
        
        {/* Header with Navigation */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 text-center">
            <h2 className="font-copperplate text-xl leading-minor-heading lg:text-section-heading font-black px-1 text-black mb-2 md:mb-10 uppercase">
                FIND A CONNECT THAT FITS INTO<br className="hidden md:block" />
                YOUR SCHEDULE
              </h2>
            </div>
          </div>
          <p className="font-body text-gray-700 text-sm sm:text-body-text lg:text-body-text-lg max-w-3xl mx-auto text-center">
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
              className="relative shrink-0 w-[85vw] md:w-100 h-125 rounded-lg overflow-hidden group cursor-pointer snap-center"
              onClick={() => {
                setSelectedGroup(group.id);
                setIsModalOpen(true);
                setCopied(false);
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={group.image}
                  alt={group.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Arrow Icon - Larger and more visible */}
              <button 
                className="absolute top-4 right-4 hover:opacity-80 transition-opacity z-10"
              >
                <svg className="w-12 h-12 text-white drop-shadow-lg" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M36.3959 68.1616C24.5383 62.4535 19.5664 48.2515 25.2745 36.3938C30.9826 24.5362 45.1847 19.5643 57.0423 25.2724C68.8999 30.9805 73.8718 45.1826 68.1637 57.0402C62.4556 68.8978 48.2535 73.8698 36.3959 68.1616ZM55.8278 27.7953C45.3578 22.7552 32.8375 27.1383 27.7974 37.6083C22.7572 48.0784 27.1404 60.5986 37.6104 65.6388C48.0804 70.6789 60.6007 66.2957 65.6408 55.8257C70.681 45.3557 66.2978 32.8354 55.8278 27.7953Z" fill="currentColor"/>
                  <path d="M56.1551 53.9013L50.7252 38.3911L35.215 43.821L34.2992 41.2048L52.4255 34.859L58.7713 52.9854L56.1551 53.9013Z" fill="currentColor"/>
                  <path d="M50.3145 36.0176L52.8373 37.2321L42.5142 58.6767L39.9913 57.4622L50.3145 36.0176Z" fill="currentColor"/>
                </svg>
              </button>
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Content with backdrop */}
              <div className="absolute bottom-0 left-0 right-0">
                {/* Transparent glass backdrop behind text */}
                <div className="bg-white/20 backdrop-blur-sm p-6">
                  <h3 className="font-display text-white font-black mb-3 text-lg uppercase leading-tight drop-shadow-lg">
                    {group.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white shrink-0 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <p className="font-body text-white text-sm drop-shadow">{group.day}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5 drop-shadow" />
                      <p className="font-body text-white/90 text-sm leading-tight drop-shadow">{group.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-white shrink-0 drop-shadow" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Modal Popup */}
      {isModalOpen && selectedGroup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {groups
                .filter((group) => group.id === selectedGroup)
                .map((group) => (
                  <div key={group.id} className="space-y-4">
                    {/* Header */}
                    <div>
                      <h3 className="font-copperplate text-xl font-black text-black uppercase mb-1">
                        {group.name}
                      </h3>
                      <div className="h-0.5 w-16 bg-linear-to-r from-orange-500 to-orange-300 mb-4" />
                    </div>

                    {/* Leader Info */}
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        LEADER IN CHARGE
                      </p>
                      <p className="font-display text-lg text-black font-bold">
                        {group.leader}
                      </p>
                       <p className="text-sm text-gray-600 ">
                        <span className="font-medium text-xs">Phone No.:</span> {group.whatsapp}
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <p className="font-body text-sm text-gray-700 leading-relaxed">
                        {group.message}
                      </p>
                    </div>

                    {/* Visit Info */}
                    <div className="border-t pt-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                        MEETING DETAILS
                      </p>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-orange-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <span>{group.day}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-4 h-4 text-orange-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{group.time}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                          <span>{group.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Contact Card
                    <div className="flex flex-col gap-3 bg-green-50 p-4 rounded-xl mt-6 border border-green-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold  text-gray-600 uppercase tracking-wider">WHATSAPP CONTACT</p>
                          <p className="text-lg font-bold text-black">{group.whatsapp ?? "No number available"}</p>
                          <p className="text-xs text-gray-500">Reach out to {group.leader} to join this connect</p>
                        </div>
                        <div className="w-8 h-8">
                          <svg viewBox="0 0 32 32" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#25D366"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/>
                          </svg>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={async () => {
                          if (!group.whatsapp) return;
                          await navigator.clipboard.writeText(group.whatsapp);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-green-200 text-green-600 hover:bg-green-100 transition"
                      >
                        Copy
                      </button>
                      <a
                        href={`https://wa.me/${formatWhatsAppNumber(group.whatsapp ?? "")}?text=${encodeURIComponent(
                          `Hi ${group.leader}, I'm interested in joining ${group.name}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>

                      {copied && (
                        <p className="text-xs text-green-700 font-medium">Copied to clipboard!</p>
                      )}
                    </div> */}
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
