import {
  RiFileImageLine,
  RiFileVideoLine,
  RiFileUnknowLine,
  RiCalendar2Line,
} from "@remixicon/react";
import { parseISO } from "date-fns";
import { Badge } from "../badge";
import { format } from "date-fns";
import { PageEyebrow, PageTitle } from "../typography";

type APODHeaderProps = {
  title: string;
  date: string;
  media_type: "image" | "video";
};

export function APODHeader({ title, date, media_type }: APODHeaderProps) {
  return (
    <header className="space-y-6 px-3 lg:px-8 pb-8">
      <PageEyebrow>Astronomy Picture of the Day</PageEyebrow>

      <PageTitle>{title}</PageTitle>

      <div className="flex gap-1 flex-wrap">
        <Badge variant="secondary">
          {media_type === "image" ? (
            <>
              <RiFileImageLine />
              <span>Image</span>
            </>
          ) : media_type === "video" ? (
            <>
              <RiFileVideoLine />
              <span>Video</span>
            </>
          ) : (
            <>
              <RiFileUnknowLine />
              <span>Unknown media type</span>
            </>
          )}
        </Badge>

        <Badge variant="secondary">
          <RiCalendar2Line />
          <span>{format(parseISO(date), "do MMMM yyyy")}</span>
        </Badge>
      </div>
    </header>
  );
}
