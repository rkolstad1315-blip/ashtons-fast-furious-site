import { Icon } from "@/components/icons";
import type { TrustItemId } from "../../../content/home";

export function TrustIcon({ id }: { id: TrustItemId }) {
  return (
    <span className="icon-chip">
      <Icon name={id} className="h-7 w-7" />
    </span>
  );
}
