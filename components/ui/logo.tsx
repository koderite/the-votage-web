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
        src="/img/logo.png" 
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
