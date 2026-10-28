import NextLink from "next/link";
import type { ComponentProps } from "react";

// Prefetching is off site wide: in viewport it would fetch every route in the
// header and footer on first load. With prefetch off, Next fetches a route
// only when its link is clicked; hover and touch do not prefetch.
export function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
