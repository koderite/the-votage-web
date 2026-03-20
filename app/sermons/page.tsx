import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import SermonsPageClient from "@/components/sermon/sermons-page";

export default function SermonsPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      <SermonsPageClient />
      <Footer />
    </div>
  );
}
