import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { AnalyticsBootstrap } from "@/components/analytics-bootstrap";
import { IconSprite } from "@/components/icons";
import { MobileBar } from "@/components/mobile-bar";
import { InteractionLayer } from "@/components/polish/interaction-layer";
import { PawTrailLoader } from "@/components/polish/paw-trail-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { content } from "../../content";
import { warnContentPlaceholders } from "../../content/placeholders";
import { isPlaceholder } from "../../content/placeholders";
import { googleSiteVerification, siteUrl } from "../../content/seo";
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

// Body copy uses optional: Inter paints when it is already cached, and a
// first visit on a slow connection keeps the size adjusted fallback instead
// of swapping mid read. Swapping shifted long posts by up to 0.19 CLS.
const body = Inter({
  subsets: ["latin"],
  display: "optional",
  preload: false,
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...(isPlaceholder(googleSiteVerification)
    ? {}
    : { verification: { google: googleSiteVerification } }),
};

// Pinch zoom stays available: maximumScale and userScalable are omitted.
// formatDetection is omitted so telephone=no is not added.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        <IconSprite />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBar />
        <InteractionLayer />
        <PawTrailLoader />
        <AnalyticsBootstrap />
      </body>
    </html>
  );
}
