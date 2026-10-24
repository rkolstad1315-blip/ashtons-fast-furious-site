import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { AnalyticsBootstrap } from "@/components/analytics-bootstrap";
import { IconSprite } from "@/components/icons";
import { MobileBar } from "@/components/mobile-bar";
import { InteractionLayer } from "@/components/polish/interaction-layer";
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

const body = Inter({
  subsets: ["latin"],
  display: "swap",
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

// Marks the document as JavaScript capable before first paint so the scroll
// reveal start state never hides content from a visitor without JavaScript.
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <IconSprite />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileBar />
        <InteractionLayer />
        <AnalyticsBootstrap />
      </body>
    </html>
  );
}
