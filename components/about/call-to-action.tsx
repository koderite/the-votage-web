'use client';

import { useRouter } from 'next/navigation';

export function CallToAction() {
  const router = useRouter();

  return (
    <section className="bg-white py-20 px-6 md:px-[80px]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl text-black font-copperplate xl:text-7xl font-bold mb-4 tracking-tight">
          YOUR SEAT IS SAVED.
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-black font-copperplate lg:text-2xl mb-12 tracking-wide">
          JOIN The Votage experience this weekend.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => router.push('/plan-your-visit')}
            className="bg-black text-white border-2 border-black px-10 py-4 rounded-full text-lg font-medium tracking-wide hover:bg-white hover:text-black transition-colors"
          >
            PLAN YOUR VISIT
          </button>
          <button
            onClick={() => router.push('/contact')}
            className="bg-transparent text-black border-2 border-black px-10 py-4 rounded-full text-lg font-medium tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
