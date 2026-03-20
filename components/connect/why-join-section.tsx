import Image from "next/image";

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse" />;
}

export default function WhyJoinSection() {
  const reasons = [
    {
      title: "SPIRITUAL GROWTH",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power aod",
    },
    {
      title: "REAL CONNECTIONS",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power And",
    },
    {
      title: "GET ANSWERS",
      description:
        "Information about connect, what it is and what they do to present the kingdom, the power aoD",
    },
    {
      title: "BECOME FAMILY",
      description:
        "Info/talks about connect, what it is and what they/we/me ohnvndgmk, the power AoD",
    },
  ];

  return (
    <section className="w-full py-20 md:py-30 bg-white px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Image - Visible only on mobile */}
        <div className="md:hidden mb-12">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
            <BlurPlaceholder />
            <Image
             src="/img/belong-2.png"
              alt="Connect Group"
              fill
              className="object-cover relative z-10"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* Left side - Content */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left  md:px-0">
            <h2 className="font-copperplate text-xl  lg:text-section-heading font-black px-1 text-black mb-8 md:mb-10 leading-tight uppercase">
              Why You Should Join a<br />
              Connect Group
            </h2>

            <div className="space-y-6 md:space-y-6 max-w-lg w-full">
              {reasons.map((reason, index) => (
                <div key={index}>
                  <p className="font-body text-sm sm:text-lg lg:text-body-text-lg text-gray-700 leading-relaxed">
                    <span className="font-copperplate font-black text-black uppercase tracking-wide">{reason.title}</span> : {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image (Desktop only) */}
          <div className="hidden md:block">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <BlurPlaceholder />
              <Image
                src="/img/belong-2.png"
                alt="Connect Group"
                fill
                className="object-cover object-top relative z-10"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
