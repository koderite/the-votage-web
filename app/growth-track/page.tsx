import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import HeroSection from "@/components/growth-track/hero";
import CohortSection from "@/components/growth-track/cohort-section";
import MakeUpClassesSection from "@/components/growth-track/makeup-classes-section";
import CompletedClassesSection from "@/components/growth-track/completed-classes-section";

export default function GrowthTrackPage() {
  return (
    <>
      <div className="relative   w-full overflow-hidden">
        <Navbar />

        <main className="">
          <HeroSection />
          <div id="next-section">
            <CohortSection />
          </div>
          <MakeUpClassesSection />
          <CompletedClassesSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
