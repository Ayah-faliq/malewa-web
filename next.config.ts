import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Nama kategori lama sebelum menjadi "Pasa Malewa"
    return [{ source: "/kategori/oleh-oleh", destination: "/kategori/pasa", permanent: true }];
  },
};

export default nextConfig;
