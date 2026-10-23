import type { Metadata } from "next";
import { BookPage } from "@/components/booking/book-page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return pageMetadata("/book/");
}

export default function Page() {
  return (
    <>
      <JsonLd path="/book/" />
      <BookPage />
    </>
  );
}
