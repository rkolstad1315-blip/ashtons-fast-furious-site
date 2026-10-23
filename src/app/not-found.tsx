import type { Metadata } from "next";
import { NotFoundPage } from "@/components/pages/not-found-page";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Ashtons" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
