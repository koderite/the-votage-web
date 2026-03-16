import ConnectHero from "@/components/connect/connect-hero";
import WhyJoinSection from "@/components/connect/why-join-section";
import ConnectGroupsSection from "@/components/connect/connect-groups-section";
import TestimonySection from "@/components/connect/testimony-section";
import TrybeSection from "@/components/connect/trybe-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function ConnectPage() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <ConnectHero />
        <WhyJoinSection />
        <ConnectGroupsSection />
        <TestimonySection />
        <TrybeSection />
        <Footer />
      </main>
    </>
  );
}
