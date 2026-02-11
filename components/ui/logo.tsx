import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  alt?: string;
}

export const Logo = ({ className = "w-full h-full object-cover", alt = "Votage Logo" }: LogoProps) => {
  return (
    <div className="bg-white/10 inline-block">
      <Image 
        src="https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/29fc/aaaf/990b37e9f81712729c82732ad77fb95a?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CZUjyZSQXKMsIiT7OmHxP2qnI0gZI4WXXKMAX17RqNi396S2URAp~eE-OKhaVYsT2T~MVdDZKTdgBTFzB2XuXGNi2p1i6t6h~9huoYba-oIyPH06O4RFJnbg8CagWKOjFjYvuE3q0l6Hj7aRxJq~ByOtMwBwPqTKpIYY4bm45lrAyNMu3aGcxMvrwbSMKe4UYvWEMB4wYeeIe~tsFkYywoSP3-GacyLhFHZnW2M4OIoDyDVsz5Re-uoj2Drzz4Zxuj6K7PYEf3Stqi9SoIK-FbgIAhxZBxmC4sZZgSreTIJ2n8VauFfcRdFYvU8C0l4tGfnKnm9NbvkPJv4oRHCdLg__" 
        alt={alt} 
        className={className}
        width={150}
        height={150}
        unoptimized
      />
    </div>
  );
};

export default Logo;
