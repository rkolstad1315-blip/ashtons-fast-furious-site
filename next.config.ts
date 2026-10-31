import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Hero srcset widths from ticket 04. imageSizes stay below the smallest device size.
    deviceSizes: [375, 768, 1280],
    imageSizes: [32, 48, 64, 96, 128, 256],
    // AVIF first: the logo artwork is about 40% smaller than WebP at the same quality.
    formats: ["image/avif", "image/webp"],
    // Optimized images stay cached for 31 days; the source files below carry a year.
    minimumCacheTTL: 2678400,
  },
  async headers() {
    // /_next/static already ships public, max-age=31536000, immutable.
    // Files in /public are not content hashed, so replacing one means renaming it.
    const longCache = [
      { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
    ];
    return [
      { source: "/images/:path*", headers: longCache },
      { source: "/brand/:path*", headers: longCache },
      { source: "/paw-trail-2.js", headers: longCache },
    ];
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about/",
        statusCode: 301,
      },
      {
        source: "/about-us/",
        destination: "/about/",
        statusCode: 301,
      },
      {
        source: "/contact-us",
        destination: "/book/",
        statusCode: 301,
      },
      {
        source: "/contact-us/",
        destination: "/book/",
        statusCode: 301,
      },
      {
        source: "/",
        has: [{ type: "host", value: "ashtonsfastfurious.com" }],
        destination: "https://www.ashtonsfastfurious.com/",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "ashtonsfastfurious.com" }],
        destination: "https://www.ashtonsfastfurious.com/:path*/",
        statusCode: 301,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Bundle analysis: `npx next analyze` (Turbopack). @next/bundle-analyzer is webpack only.
export default nextConfig;
