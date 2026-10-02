import type { ApodResponse } from "@/lib/nasa/types";
import { format, parseISO } from "date-fns";
import APODMedia from "@/components/ui/apod/media/media";
import { Separator } from "@/components/ui/separator";
import { APODHeader } from "./header";
import { APODExplanation } from "./explanation";

export default function APODPageContent({ apod }: { apod: ApodResponse }) {
  return (
    <div className="py-8 md:border-r not-md:border-b">
      <APODHeader
        title={apod.title}
        date={apod.date}
        media_type={apod.media_type}
      />

      <Separator />

      <APODMedia
        title={apod.title}
        date={format(parseISO(apod.date), "do MMMM yyyy")}
        copyright={apod.copyright ?? undefined}
        hdurl={apod.hdurl}
        media_type={apod.media_type}
      />

      <Separator />

      <APODExplanation explanation={apod.explanation} />
    </div>
  );
}
