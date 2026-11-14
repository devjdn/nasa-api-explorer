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
      <article className="space-y-snug">
        {image_url && (
          <div className="relative aspect-4/3 bg-muted">
            <Image
              fill
              src={image_url}
              className="object-contain object-center"
              loading="lazy"
              alt={title}
            />
          </div>
        )}

        <div className="flex flex-col-reverse gap-gutter">
          <h3 className="group-hover:underline">{title}</h3>

          {/*<div className="flex gap-1 flex-wrap">
            <Badge variant="outline">
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

            <Badge variant="outline">
              <RiCalendar2Line />
              <span>{format(parseISO(date), "do MMMM yyyy")}</span>
            </Badge>
          </div>*/}
        </div>
      </article>
    </Link>
  );
}
