"use client"

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { YouTubeIcon } from '@/components/icons/youtube-icon';

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse" />;
}

interface MediaItem {
  id: string;
  icon: 'telegram' | 'youtube' | 'spotify';
  title: string;
  subtitle: string;
  description: string;
  contentTitle: string;
  contentSubtitle: string;
  contentTag: string;
  image: string;
  url: string;
}

const mediaItems: MediaItem[] = [
  {
    id: '0',
    icon: 'youtube',
    title: 'WATCH OUR MOVIES AND SHORT SKITS',
    subtitle: 'Lessons and stories that will impact your life',
    description: 'The Winlos',
    contentTitle: 'Spirtuals Part 4',
    contentSubtitle: 'The Winlos',
    contentTag: 'Latest Video',
    image: 'https://img.youtube.com/vi/y41jI31M-3Y/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=y41jI31M-3Y',
  },
  {
    id: '1',
    icon: 'telegram',
    title: 'SUNDAY SERMONS',
    subtitle: 'REV. OHIS',
    description: 'Breaking patterns & generational strong hold',
    contentTitle: 'Grace Called Work',
    contentSubtitle: '',
    contentTag: 'Latest Sermon',
    image: 'https://img.youtube.com/vi/KC3-UJNrRY4/sddefault.jpg',
    url: 't.me/AAAAAEZ6sbhFRtY4ERUROA',
  },
  {
    id: '2',
    icon: 'youtube',
    title: 'STREAM REFRESH PROGRAMS',
    subtitle: 'Every Last Saturday of the month',
    description: 'Anwiii Ojeikere(THE WINLOS)',
    contentTitle: 'Stream Refresh Programs',
    contentSubtitle: 'Every Last Saturday',
    contentTag: 'Monthly Program',
    image: '/img/stream-refresh.jpg',
    url: 'https://www.youtube.com/@AnwinliOjeikere',
  },
  {
    id: '3',
    icon: 'spotify',
    title: 'SUNDAY SERMONS',
    subtitle: 'Pastor anwinli ojeikere',
    description: 'The Available Man',
    contentTitle: 'The Capacity Before Glory',
    contentSubtitle: '',
    contentTag: 'Latest Sermon',
    image: '/img/serm-rev.jpg',
    url: 'https://open.spotify.com/show/4KLNlwoOOutIpPgcqfkhDt?si=2zoqF8c8QeeQbNhe72SloA',
  }
];

const TelegramIcon = () => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#2AABEE] flex items-center justify-center flex-shrink-0">
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  </div>
);

const YouTubeIconColored = () => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FF0000] flex items-center justify-center flex-shrink-0">
    <YouTubeIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
  </div>
);

const SpotifyIcon = () => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#1DB954] flex items-center justify-center flex-shrink-0">
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  </div>
);

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'telegram':
      return <TelegramIcon />;
    case 'youtube':
      return <YouTubeIconColored />;
    case 'spotify':
      return <SpotifyIcon />;
    default:
      return <TelegramIcon />;
  }
};

export default function MediaSermons() {
  const [activeItem, setActiveItem] = useState(mediaItems[0]);

  return (
    <div 
      className="min-h-screen text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/img/serm-con.png)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-copperplate md:text-4xl lg:text-5xl xl:text-[48px] leading-tight mb-6 sm:mb-8 md:mb-12 lg:mb-16 tracking-tight">
          ACCESS OUR MEDIA<br />AND SERMONS
        </h1>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {/* Left Side - Media List */}
          <div className="w-full lg:w-[45%] xl:w-[40%] space-y-3 sm:space-y-4 md:space-y-6">
            {mediaItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-300 relative group ${
                  activeItem.id === item.id
                    ? 'bg-[#1a1a1a] border-l-4 border-white'
                    : 'bg-[#0d0d0d] hover:bg-[#1a1a1a] border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0">{getIcon(item.icon)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-minor-heading tracking-wider mb-0.5 sm:mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mb-0.5 sm:mb-1 uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Content Display */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex items-center">
            <div className="w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden relative h-[250px] sm:h-[300px] md:h-[400px] lg:aspect-[4/3]">
              <BlurPlaceholder />
              <motion.div
                key={activeItem.id}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 z-10"
              >
                <Image
                  src={activeItem.image}
                  alt={activeItem.contentTitle}
                  fill
                  className="object-contain md:object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
                />
              </motion.div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 bg-[rgba(255,255,255,0.15)] backdrop-blur-[12px] flex flex-col gap-1 sm:gap-2 px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6 rounded-br-[24px] sm:rounded-br-[30px] md:rounded-br-[36px] rounded-tr-[24px] sm:rounded-tr-[30px] md:rounded-tr-[36px] z-20 w-auto max-w-[95%] md:max-w-[80%]" >
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 uppercase tracking-normal">
                  {activeItem.contentTag}
                </p>
                <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl capitalize leading-tight">
                  {activeItem.contentTitle}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-300">
                  {activeItem.contentSubtitle}
                </p>

                {/* Watch Button */}
                <button 
                  className="mt-1 sm:mt-2 px-4 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-full border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm md:text-base w-fit"
                  onClick={() => activeItem.url && window.open(activeItem.url, '_blank')}
                >
                  Watch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
