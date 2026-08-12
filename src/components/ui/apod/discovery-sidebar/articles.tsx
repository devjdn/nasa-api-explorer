import Link from "next/link";
import { Badge } from "../../badge";
import {
  RiFileImageLine,
  RiFileVideoLine,
  RiFileUnknowLine,
  RiCalendar2Line,
} from "@remixicon/react";
import { format, parseISO } from "date-fns";
import Image from "next/image";

type APODDiscoveryArticlesProps = {
  title: string;
  date: string;
  media_type: "image" | "video";
  image_url?: string;
};

export default function APODDiscoveryArticles({
  title,
  date,
  media_type,
  image_url,
}: APODDiscoveryArticlesProps) {
  return (
    <Link href={`/apod/${date}`} className="group">
      <article className="md:border-b space-y-3 pt-3 px-3 pb-8 not-md:group-not-last:border-b transition-colors">
        {image_url && (
          <div className="relative aspect-video">
            <Image
              fill
              src={image_url}
              className="object-cover object-center"
              loading="lazy"
              alt={title}
            />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <span className="font-semibold group-hover:underline tracking-display-medium">
            {title}
          </span>

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
        </div>
      </article>
    </Link>
  );
}
