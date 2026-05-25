import { NeoOverview } from "../overview";
import ObjectSection from "../object-section";
import { Separator } from "@/components/ui/separator";
import type { NeoObject } from "@/lib/nasa/types";

export default function NeoFeed({ neo }: { neo: NeoObject[] }) {
  return (
    <div className="@container">
      <NeoOverview neo={neo} />
      <Separator />
      <ObjectSection neo={neo} />
    </div>
  );
}
