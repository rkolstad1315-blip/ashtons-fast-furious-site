import type { NextConfig } from "next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // Hero srcset widths from ticket 04. imageSizes stay below the smallest device size.
    deviceSizes: [375, 768, 1280],
    imageSizes: [32, 48, 64, 96, 128, 256],
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

export default withBundleAnalyzer(nextConfig);
