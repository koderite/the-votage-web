import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
  output: 'export',
=======
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
>>>>>>> b72519179838365a5b8c83e00833c69a4b54d88c
};

export default nextConfig;
