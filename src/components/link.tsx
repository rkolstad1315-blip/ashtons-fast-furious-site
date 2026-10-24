import NextLink from "next/link";
import type { ComponentProps } from "react";

// Viewport prefetching is off site wide: it would fetch every route in the
// header and footer on first load and create a second IntersectionObserver.
// Links still prefetch on hover and touchstart.
export function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
