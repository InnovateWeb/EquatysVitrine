import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // equatys.ch (sans www) sert le même contenu que www → Google le
      // voit comme du contenu dupliqué. 301 vers le domaine canonique.
      {
        source: "/:path*",
        has: [{ type: "host", value: "equatys.ch" }],
        destination: "https://www.equatys.ch/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
