import { Icon } from "@/components/icons";
import type { TrustItemId } from "../../../content/home";

export function TrustIcon({ id }: { id: TrustItemId }) {
  return <Icon name={id} className="h-8 w-8 shrink-0 text-navy" />;
}
