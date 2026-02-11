'use client';

import Image from 'next/image';

function BlurPlaceholder({ children }: { children?: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl">
      {children}
    </div>
  );
}

export function LeadPastors() {
  return (
    <section className="py-20 px-6 text-black md:px-[80px]" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-copperplate md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            MEET OUR LEAD PASTORS
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto">
            Explore our journey, our heart for the truth, and find a community where you truly belong.
          </p>
        </div>

        {/* Pastor Profiles */}
        <div className="space-y-16">
          {/* Rev. Ohis Ojeikere - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <BlurPlaceholder />
              <Image
                src="/img/about/lead-rev.jpg"
                alt="Rev. Ohis Ojeikere preaching"
                fill
                style={{objectPosition: "center 20%"}}
                className="w-full h-auto rounded-3xl object-cover relative z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k=" // Tiny gray blur placeholder
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Rev. Ohis Ojeikere</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Rev. Ohis Ojeikere is a seasoned teacher and visionary with an apostolic mandate to reach this generation. From leading children's ministry at age 13 to serving as an RCCG Youth Pastor, his life has been defined by a deep commitment to the Great Commission. In 2013, he co-founded The Winlos, a global media ministry impacting millions.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Following a divine instruction in 2018, he founded The Votage Church to bridge digital reach with spiritual depth. He is dedicated to the business of fervent prayer and presenting every man mature in Christ.
              </p>
            </div>
          </div>

          {/* Pastor Anwinli Ojeikere - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:order-1">
              <h3 className="text-2xl md:text-3xl font-bold">Pastor Anwinli Ojeikere</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Pastor Anwinli Ojeikere is a gifted minister and prayer catalyst dedicated to helping believers fulfill their divine purpose. As a pillar of The Votage and co-visionary of The Winlos, she leverages creative mediums to broadcast the Gospel globally.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                She is the convener of the Refresh Miracle Service and Refresh Morning Prayers, hosting a daily global altar at 5:00 AM. Her ministry emphasizes New Creation realities and spiritual growth. Standing as a spiritual mother, she is committed to fostering an environment where the supernatural is a daily experience.
              </p>
            </div>
            <div className="relative aspect-[4/3] lg:order-2 overflow-hidden rounded-3xl">
              <BlurPlaceholder />
              <Image
                src="/img/about/lead-FL.jpg"
                alt="Pastor Anwinli Ojeikere speaking"
                fill
                className="w-full h-auto rounded-3xl object-cover relative z-10"
                sizes="(max-width: 1024px) 100vw, 50vw"
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

export default LeadPastors;