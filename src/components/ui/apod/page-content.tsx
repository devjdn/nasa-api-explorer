import type { ApodResponse } from "@/lib/nasa/types";
import APODMedia from "@/components/ui/apod/media/media";
import { APODHeader } from "./header";
import { APODExplanation } from "./explanation";

export default function APODPageContent({ apod }: { apod: ApodResponse }) {
  return (
    <>
      <APODHeader title={apod.title} date={apod.date} />

      <APODMedia
        title={apod.title}
        copyright={apod.copyright ?? undefined}
        hdurl={apod.hdurl}
        media_type={apod.media_type}
      />

      <APODExplanation explanation={apod.explanation} />
    </>
  );
}
