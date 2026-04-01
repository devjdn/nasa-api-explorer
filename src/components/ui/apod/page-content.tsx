import type { ApodResponse } from "@/lib/nasa/types";
import { format, parseISO } from "date-fns";
import {
  PageEyebrow,
  PageTitle,
  SubsectionTitle,
} from "@/components/ui/typography";
import APODDetails from "@/components/ui/apod/details";
import APODMedia from "@/components/ui/apod/media";
import { Separator } from "@/components/ui/separator";

export default function APODPageContent({ apod }: { apod: ApodResponse }) {
  return (
    <div className="space-y-8 *:not-data-[slot=separator]:px-3 *:not-data-[slot=separator]:lg:px-8">
      <div className="space-y-6">
        <PageEyebrow>Astronomy Picture of the Day</PageEyebrow>
        <PageTitle>{apod.title}</PageTitle>
        <APODDetails date={apod.date} media_type={apod.media_type} />
      </div>

      <Separator />

      <APODMedia
        title={apod.title}
        date={format(parseISO(apod.date), "do MMMM yyyy")}
        copyright={apod.copyright ?? undefined}
        url={apod.url}
        hdurl={apod.hdurl}
        media_type={apod.media_type}
      />

      <Separator />

      <div className="space-y-4">
        <SubsectionTitle as="h2">Explanation</SubsectionTitle>
        <p className="text-base text-muted-foreground">{apod.explanation}</p>
      </div>
    </div>
  );
}
