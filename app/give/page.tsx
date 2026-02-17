import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GiveHero } from "@/components/give/give-hero";
import JoinMission from "@/components/give/join-mission";
import InternationalTransfer from "@/components/give/international-transfer";
import WhereGiving from "@/components/give/where-giving";

export default function GivePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />

      <main className=" min-h-screen">
        <GiveHero />
        <JoinMission />
        <InternationalTransfer />
        <WhereGiving />
      </main>

      <Footer />
    </div>
  );
}
