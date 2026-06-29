import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { HeroSection } from '@/components/hero/hero-section';
import { InfoCardsSection } from '@/components/home/info-cards-section';
import { BelongSection } from '@/components/home/belong-section';
import MediaSermons from '@/components/home/media-section';
import { getMediaItems } from '@/lib/media';
import { EventsSection } from '@/components/home/events-section';
import { WatchLiveSection } from '@/components/home/watch-live-section';
import { TrustSection } from '@/components/home/trust-section';
import { QuickLinksSection } from '@/components/home/quick-links-section';
import { Footer } from '@/components/layout/footer';

export default async function Home() {
  const mediaItems = await getMediaItems();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <InfoCardsSection />
        <BelongSection />
        <MediaSermons items={mediaItems} />
        <EventsSection />
        <WatchLiveSection />
        <TrustSection />
        <QuickLinksSection />
      </main>
      <Footer />
    </div>
  );
}
