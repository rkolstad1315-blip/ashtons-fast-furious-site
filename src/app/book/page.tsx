import type { Metadata } from "next";
import { BookPage } from "@/components/booking/book-page";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return pageMetadata("/book/");
}

export default function Page() {
  return <BookPage />;
}
