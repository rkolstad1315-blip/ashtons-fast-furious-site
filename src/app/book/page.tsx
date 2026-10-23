import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { BookPage } from "@/components/pages/book-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("/book/");

export default function Page() {
  return (
    <>
      <JsonLd path="/book/" />
      <BookPage />
    </>
  );
}
