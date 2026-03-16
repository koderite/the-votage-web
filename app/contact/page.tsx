import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { LocationMap } from "@/components/contact/location-map";
import { ContactInfo } from "@/components/contact/contact-info";

export default function ContactPage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar  />
      <ContactHero />
      <ContactForm />
      <LocationMap />
      <ContactInfo />
      <Footer />
    </div>
  );
}
