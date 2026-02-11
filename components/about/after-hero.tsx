import React from 'react';
import Image from 'next/image';

function BlurPlaceholder() {
  return <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-3xl" />;
}

export function AfterHero() {
  return (
    <section className="bg-white pt-20 pb-16 px-6  md:px-[80px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[39px] items-start">
          {/* Left: Image */}
          <div className="flex justify-center lg:justify-start h-full w-full relative">
            <div className="rounded-3xl w-full object-cover h-full max-h-[700px] overflow-hidden">
              <BlurPlaceholder />
              <Image
                src="/img/about/compelled-by-love.jpg"
                alt="Rev-holding-mic"
                width={800}
                height={600}
                className="rounded-3xl w-full object-cover h-full max-h-[700px] relative z-10"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAxEPwAB//9k="
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 w-full">
            <h1 className="text-3xl text-black font-copperplate md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              COMPELLED BY LOVE<br />TO REACH ALL.
            </h1>

            <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Left column */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed">
                  The Votage is a global ministry expression called to be the sound of truth in this generation. We exist to bridge the gap between digital reach and spiritual depth, leveraging every modern tool to broadcast the life-giving message of Jesus.
                </p>

                <p className="text-lg md:text-xl leading-relaxed">
                  Our Vision is <strong>to see every family on earth blessed by the power of the Gospel as we present every man mature in Christ.</strong>
                </p>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed">
                  Our Mission is simple yet profound: <strong>to reach people with the life-giving message of Jesus, that they might become fully devoted followers of Christ.</strong>
                </p>

                <p className="text-lg md:text-xl leading-relaxed">
                  From our local tribes to our global streams, we are more than a congregation.
                  <br /><br />
                  We are a family dedicated to raising a generation that lives the supernatural life daily.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AfterHero;
