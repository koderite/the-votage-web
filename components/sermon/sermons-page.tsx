"use client";

import { SermonHero } from "./sermon-hero";
import MessageSection from "./message-section";

export default function SermonsPageClient() {
  return (
    <main className="min-h-screen">
      <SermonHero />
      <MessageSection />
    </main>
  );
}
