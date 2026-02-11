import React from 'react';
import Image from 'next/image';

const events = [
  {
    id: 1,
    title: 'Refresh Tour 2026',
    subtitle: 'Across the Globe',
    date: 'Jan 31, 2026 - Jan 13, 2027',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/b677/dcb5/53bf05247826f55e0b24974f4bab292c?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hk0tXKoFHle59i3K1In3q4ZE0sUolpIxoNXoWUpnx22ENxZyYJbMbH4UuUDfc1Zb3jrfPsXzKsOxux1-Hy0p1HQDBhxS0QuOMJ~CzMhA39LTIf~MhqBLwDSh4ZfkoLGHyVkNPv2JcRWirsrklB6n004ucQnT6g3DiQJYXOZNBZugtn-ZmPot0DEZ9gJOAEwMxj-EHombx9gYfY8a0n-ebX~Vx9sflBVFeui0FPi5IqLKFgo0Mn4RF1Rw-nAyTGNsjxkIYEqL81vugLbf2Hb4ms-I~rARtD07xLMUDwoE1yahjRNatZjwfokHMlc2gXiYkTGb0~cijHFsePA3nT~WIw__'
  },
  {
    id: 2,
    title: 'Refresh Tour 2026',
    subtitle: 'Across the Globe',
    date: 'Jan 31, 2026 - Jan 13, 2027',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/b991/d952/85989c6d99114370a8a7a7c0f31d3ebc?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TGFGi~SkZQTPjYAnBOiLRjcq2XdNxRb6O-UMsLmiSvV2e8xH6VR-P8ihJkD7I5XYXevcCPHUn9K594V7nIhl7ycc7x4tjw8Ix4JKxyUAPH2LpAJBpqXTqj68Vbo3HI1zHESt0a1UFhW8ZpRbtXhkO82NXQmdRXhVhNWajAvL9ps-1LQ~IdAac~-H7FHSEMeLzOBQ20niZyEsOldklBkeqeqXEKZiXc5xw-U~dPH9IWvV39m-pB52oVbSWLuhNKz1Jb2KsdZX8sOQbg~n~oEqxuWLxfqXhBALzR19eRbuOMqEf82nglI~9DHLbqjEphs9wbnxoZ9V0akN4CIDOGZVZg__'
  },
  {
    id: 3,
    title: 'Refresh Tour 2026',
    subtitle: 'Across the Globe',
    date: 'Jan 31, 2026 - Jan 13, 2027',
    image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/ece2/98d0/ec2c16f10310d45724b276a6035cb503?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PodbDqIAdI1sCaLk0uHqoJzCaoj~Glu3~yQzK7lwT2D6PLgp6TVTQeM~g48Uo~1Z27cbFtz6TrqROpt5jqvVVefnYADGoEPcN-tNT~A4xDILoYKhCSTT5L1e2jiHn6EYK58Acyt74H~8vR8ItgfaGGvSc6sx4TXntoRdWv7Ho0lqlJDd5DiGD~Yelv-Z3WetNWI7LflCGcTO0hor42a41Pn2oOOsVGZHLod8-QSetpfrp9vFwmtb1Uum8k6qyExmiogqJYgPfgEGL9uaUet1LlgK4pBx~idf16LRavTs33PIrqENPBvvAO6urT-W3cR1Lp0S5pE2ClDUHn4aBkEWog__'
  }
];

export const EventsSection = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <h2 className="font-copperplate font-bold text-3xl lg:text-5xl text-black uppercase text-center mb-16">
          Up Coming Events
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-xl transition-shadow duration-300 p-3 flex flex-col gap-4"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded relative bg-gray-200">
                <Image 
                  src={event.image} 
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="px-2 pb-4">
                <h3 className="font-copperplate text-xl text-black mb-1">{event.title}</h3>
                <p className="font-copperplate text-base text-black mb-2">{event.subtitle}</p>
                <p className="font-body text-xs text-[#959595]">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
