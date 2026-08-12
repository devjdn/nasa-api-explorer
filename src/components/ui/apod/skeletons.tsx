import {
  RiFileUnknowLine,
  RiCalendar2Line,
  RiShare2Line,
  RiFullscreenLine,
} from "@remixicon/react";
import { Badge } from "../badge";
import { Separator } from "../separator";
import { Skeleton } from "../skeleton";
import { PageEyebrow, SubsectionTitle } from "../typography";
import { Button } from "../button";

export function APODSkeleton() {
  return (
    <div className="py-8 border-r">
      {/* Header */}
      <APODHeaderSkeleton />

      <Separator className="mt-8 mb:0" />

      {/* Media */}
      <APODMediaSkeleton />

      <Separator className="my-8" />

      {/* Explanation */}
      <APODExplanationSkeleton />
    </div>
  );
}

export function APODHeaderSkeleton() {
  return (
    <div className="space-y-6 px-3 lg:px-8">
      <div className="space-y-4 text-center">
        <PageEyebrow>Astronomy Picture of the Day</PageEyebrow>
        <Skeleton className="h-9 lg:h-10 w-2/3 mx-auto" />
      </div>

      <div className="flex gap-1 flex-wrap justify-center">
        <Badge variant="secondary">
          <RiFileUnknowLine />
          <span>Media type</span>
        </Badge>

        <Badge variant="secondary">
          <RiCalendar2Line />
          <span>Date</span>
        </Badge>
      </div>
    </div>
  );
}

export function APODMediaSkeleton() {
  return (
    <div className="w-full" data-component="media">
      {/* Image */}
      <Skeleton className="w-full aspect-3/2 border-b" />

      {/*<Button className="w-full" variant="secondary">
        <RiFullscreenLine />
        <span>Click to view fullscreen</span>
      </Button>*/}

      <Separator className="mb-8" />

      <div className="space-y-4 px-3 lg:px-8">
        {/* Credit */}
        <Skeleton className="w-1/2 h-3.5" />

        {/* Share */}
        <Button variant={"secondary"} size={"sm"} disabled>
          <RiShare2Line />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}

export function APODExplanationSkeleton() {
  return (
    <div className="space-y-4 px-3 lg:px-8">
      <SubsectionTitle as="h2">Explanation</SubsectionTitle>
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6" />
        ))}
      </div>
    </div>
  );
}
