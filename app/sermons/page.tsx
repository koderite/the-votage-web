import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SermonHero } from "@/components/sermon/sermon-hero";

export default function SermonsPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />

      <main className="min-h-screen">
        <SermonHero />
      </main>

      <Footer />
    </div>
  );
}
