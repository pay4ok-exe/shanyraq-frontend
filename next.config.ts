import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "findroommate.s3.eu-north-1.amazonaws.com",
      "krisha-photos.kcdn.online",
      "alaps-photos-kr.kcdn.kz",
      "alakcell-photos-kr.kcdn.kz",
    ],
  },
};

export default nextConfig;
