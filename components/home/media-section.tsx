"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Send, Youtube } from 'lucide-react';

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
}

const mediaItems: MediaItem[] = [
  {
    id: '1',
    icon: 'telegram',
    title: 'SUNDAY SERMONS',
    subtitle: 'REV. OHIS',
    description: 'Breaking patterns & generational strong hold',
    contentTitle: 'Understanding servanthood',
    contentSubtitle: 'Rev. Pastor OHIS',
    contentTag: 'Latest Sermon',
    image: '/img/serm-rev.jpg',
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
  },
  {
    id: '3',
    icon: 'spotify',
    title: 'SUNDAY SERMONS',
    subtitle: 'Pastor anwinli ojeikere',
    description: 'The Available Man',
    contentTitle: 'The Available Man',
    contentSubtitle: 'Pastor Anwinli Ojeikere',
    contentTag: 'Latest Sermon',
    image: '/img/serm-rev.jpg',
  },
  {
    id: '4',
    icon: 'youtube',
    title: 'WATCH OUR MOVIES AND SHORT SKITS',
    subtitle: 'Learns that will impact your life',
    description: 'The Winlos',
    contentTitle: 'Movies and Short Skits',
    contentSubtitle: 'The Winlos',
    contentTag: 'Latest Video',
    image: '/img/serm-rev.jpg',
  },
];

const TelegramIcon = () => (
  <div className="w-14 h-14 rounded-full bg-[#2AABEE] flex items-center justify-center">
    <Send className="w-7 h-7 text-white" />
  </div>
);

const YouTubeIcon = () => (
  <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center">
    <Youtube className="w-8 h-8 text-white fill-white" />
  </div>
);

const SpotifyIcon = () => (
  <div className="w-14 h-14 rounded-full bg-[#1DB954] flex items-center justify-center">
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 text-white fill-white"
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
      return <YouTubeIcon />;
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
      className="min-h-screen text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 md:py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/img/serm-con.png)' }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-copperplate sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight mb-8 md:mb-12 lg:mb-16 tracking-tight">
          ACCESS OUR MEDIA<br />AND SERMONS
        </h1>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12">
          {/* Left Side - Media List */}
          <div className="w-full lg:w-[45%] xl:w-[40%] space-y-4 md:space-y-6">
            {mediaItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full text-left p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all duration-300 relative group ${
                  activeItem.id === item.id
                    ? 'bg-[#1a1a1a] border-l-4 border-white'
                    : 'bg-[#0d0d0d] hover:bg-[#1a1a1a] border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  {/* Icon */}
                  <div className="flex-shrink-0">{getIcon(item.icon)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base lg:text-lg tracking-wider mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-1 uppercase tracking-wide">
                      {item.subtitle}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right Side - Content Display */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex items-center">
            <div className="w-full rounded-2xl md:rounded-3xl overflow-hidden relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3]">
              <BlurPlaceholder />
              <Image
                src={activeItem.image}
                alt={activeItem.contentTitle}
                fill
                className="object-cover object-top relative z-10"
                style={{ objectPosition: 'center 20%', transform: 'scaleX(-1)' }}
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
              />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                  <p className="text-xs md:text-sm text-gray-300 uppercase tracking-wider">
                    {activeItem.contentTag}
                  </p>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl capitalize leading-tight">
                    {activeItem.contentTitle}
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-gray-300">
                    {activeItem.contentSubtitle}
                  </p>
                </div>

                {/* Watch Button */}
                <button className="px-6 md:px-8 lg:px-10 py-2 md:py-2.5 rounded-full border-2 border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base">
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
