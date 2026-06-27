import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GiveHero } from "@/components/give/give-hero";
import JoinMission from "@/components/give/join-mission";

export default function GivePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />

      <main className=" min-h-screen">
        <GiveHero />
        <JoinMission />
      </main>

      <Footer />
    </div>
  );
}
