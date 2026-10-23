import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { headers } from "next/headers";
import { JsonLd } from "@/components/json-ld";
import { ContactAnalytics } from "@/components/contact-analytics";
import { MobileBar } from "@/components/mobile-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { content } from "../../content";
import { warnContentPlaceholders } from "../../content/placeholders";
import { siteUrl } from "../../content/seo";
import "./globals.css";

warnContentPlaceholders(content);

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: "800",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

// Pinch zoom stays available: maximumScale and userScalable are omitted.
// formatDetection is omitted so telephone=no is not added.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // The document head is rendered here, so the request pathname has to be available.
  await headers();

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBar />
        <ContactAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
