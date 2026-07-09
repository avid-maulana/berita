import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Baris ini wajib ada agar folder 'out' terbentuk saat build
  basePath: '/berita', 
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
