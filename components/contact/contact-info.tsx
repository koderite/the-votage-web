"use client"

import { useRouter } from 'next/navigation';

export function ContactInfo() {
  const router = useRouter();

  const handleGetDirections = () => {
    const destination = encodeURIComponent(
      "The Winlos Center, Ascend School, Airport Road Extension, Benin City, Edo State, Nigeria"
    );
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handlePlanYourVisit = () => {
    router.push('/plan-your-visit');
  };

  return (
    <div className="relative w-full flex items-center justify-center bg-gray-50/50">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(/img/connect-images.png)` }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 md:p-16">
          {/* Top Section: Address and Service Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
            {/* Address Section */}
            <div>
              <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-6 text-[#1a1a1a] uppercase">
                Address
              </h2>
              <p className="text-[17px] leading-[1.7] text-[#4a4a4a]">
                The Winlos Center,<br />
                By Ascend School, Airport Road<br />
                Extension, Benin City
              </p>
            </div>

            {/* Service Times Section */}
            <div>
              <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-6 text-[#1a1a1a] uppercase">
                Service Times
              </h2>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-[17px] font-semibold text-[#1a1a1a] min-w-[140px]">
                    Sunday Service:
                  </p>
                  <p className="text-[17px] text-[#4a4a4a]">8:00am</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-200 mb-12" />

          {/* Buttons Section */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full text-[15px] font-semibold hover:bg-[#000000] transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={handleGetDirections}
            >
              Get Directions
            </button>
            <button 
              className="px-10 py-4 bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] rounded-full text-[15px] font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              onClick={handlePlanYourVisit}
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
