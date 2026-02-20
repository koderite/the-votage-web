import { Button } from "@/components/ui/button";
import Image from "next/image";

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse" />;
}

export default function ConnectHero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <BlurPlaceholder />
        <Image
          src="/img/connect-page-hero-section-page..png"
          alt="Connect Hero"
          fill
          className="object-cover object-top relative z-10"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center min-h-screen h-full px-6 sm:px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 className="font-copperplate text-4xl md:text-6xl lg:text-hero-heading font-black text-white mb-4 sm:mb-6 leading-[1em] uppercase tracking-[0.02em]">
            Welcome to the<br />
            Connect System<br />
            of The Votage
          </h1>

          {/* Description */}
          <p className="font-body text-lg md:text-subheading text-white mb-6 sm:mb-8 max-w-xl leading-[1.15em]">
            Life is better together. At The Votage, Connect Groups are more than a meeting. They are where family happens.
          </p>

          {/* CTA Button */}
          <Button className="font-copperplate bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base rounded-full transition-colors">
            JOIN A CONNECT
          </Button>
        </div>
      </div>
    </section>
  );
}
