import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SermonHero } from "@/components/sermon/sermon-hero";
import MessageSection from "@/components/sermon/message-section";

export default function SermonsPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />

      <main className="min-h-screen">
        <SermonHero />
        <MessageSection />
      </main>

      <Footer />
    </div>
  );
}
