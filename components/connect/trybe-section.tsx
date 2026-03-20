"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />;
}

const faqItems = [
  {
    id: "what-is-a-trybe",
    question: "What does Connect mean at the VOTAGE Church?",
    answer:
      "A Trybe is a locally-based community designed to keep you connected near where you live. While connect groups focus on shared interests, Trybes focus on proximity so you can build relationships within your neighborhood.",
  },
  {
    id: "how-do-i-choose-a-connect",
    question: "How do i choose a connect",
    answer:
      "Connect system was designed to function according to your Schedule , whichever day of the week works best for you, there’s a connect group that meets on that day. You can choose from tuesday to saturday.",
  },
  {
    id: "different-sermons",
    question: "Do different connect have different sermons and messages per week?",
    answer:"No, all connect groups follow the same sermon series and teaching schedule as the main church. This ensures that no matter which Trybe you join, you’ll be on the same spiritual journey as everyone else in the church.",
  },
  {
    id: "far-from-church",
    question: "For those far from church axis, is there a connect system planned for them?",
    answer:
      "Connect systems are being expanded to reach more communities already,for instance Ekenwa and Ugbowo already have connect systems set up.",
  },
];

export default function TrybeSection() {
  const [showFaq, setShowFaq] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-white px-4 relative">
      {/* Mobile Background Image */}
      <div className="absolute inset-0 md:hidden">
        <BlurPlaceholder />
        <Image
          src="/img/trybe.jpg"
          alt="Trybe"
          fill
          className="object-cover relative z-10"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
        />
        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* Left side - Image (Desktop only) */}
          <div className="hidden md:block">
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
              <BlurPlaceholder />
              <Image
                src="/img/trybe.jpg"
                alt="Trybe"
                fill
                priority
                style={{ objectPosition: "0 30%" }}
                className="object-cover relative z-10"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <h2 className="font-copperplate text-2xl md:text-3xl lg:text-section-heading font-black text-white md:text-black mb-4 leading-tight uppercase">
              Choose the connect that works for you
            </h2>

            <p className="font-body text-white md:text-gray-700 text-sm md:text-body-text leading-relaxed mb-6 max-w-md">
              While Connect Groups focus on interests and stages of life, Trybes focus on proximity—ensuring you are never too far from your church family.
            </p>

            <Button
              className="font-copperplate bg-white text-black hover:bg-gray-50 px-8 py-4 font-bold text-sm uppercase rounded-full border-2 border-black transition-all hover:translate-y-[2px]"
              onClick={() => setShowFaq((prev) => !prev)}
            >
              Find out more
            </Button>

            {showFaq ? (
              <div className="mt-10 w-full max-w-xl">
                {faqItems.map((item) => {
                  const isOpen = openFaq === item.id;
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 ease-in-out mb-4"
                    >
                      <button
                        onClick={() => toggleFaq(item.id)}
                        className="w-full px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors group"
                      >
                        <span className="font-body text-lg text-black font-medium">
                          {item.question}
                        </span>
                        <div
                          className={`w-12 h-12 bg-black rounded-full flex items-center justify-center transition-all duration-300 ease-in-out ${
                            isOpen ? "rotate-180" : "group-hover:scale-110"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-6 h-6 text-white" />
                          ) : (
                            <Plus className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <p className="font-body text-lg text-gray-600 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
