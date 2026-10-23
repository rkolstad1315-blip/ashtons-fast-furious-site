import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { MobileBar } from "@/components/mobile-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { content } from "../../content";
import { warnContentPlaceholders } from "../../content/placeholders";
import { metadataCopy } from "../../content/shell";
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
  title: metadataCopy.title,
  description: metadataCopy.description,
};

// Pinch zoom stays available: maximumScale and userScalable are omitted.
// formatDetection is omitted so telephone=no is not added.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBar />
      </body>
    </html>
  );
}
