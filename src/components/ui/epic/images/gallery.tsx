"use client";

import { format } from "date-fns";
import type { EpicImage, EpicImageType } from "@/lib/EPIC/types";
import { epicClient } from "@/lib/EPIC/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GridSizeOptions } from "../viewer";

type EPICGalleryProps = {
  images: EpicImage[];
  type: EpicImageType;
  gridSize: GridSizeOptions;
};

export default function EPICViewerGallery({
  images,
  type,
  gridSize,
}: EPICGalleryProps) {
  if (!images.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No imagery available for this selection.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6 size-full px-3 lg:px-8 pt-3 lg:pt-8">
      <div>
        <p className="font-medium font-mono uppercase">
          {images.length} Images
        </p>
      </div>

      <div
        className={cn(
          "grid gap-x-2 h-full overflow-y-auto min-h-0",
          gridSize === "sm" &&
            "gap-y-8 grid-cols-1 @2xl:grid-cols-2 @6xl:grid-cols-3",
          gridSize === "default" &&
            "gap-y-6 grid-cols-1 @3xl:grid-cols-3 @6xl:grid-cols-4",
          gridSize === "lg" &&
            "gap-x-2 gap-y-6 grid-cols-2 @3xl:grid-cols-4 @6xl:grid-cols-5",
        )}
      >
        {images.map((image) => {
          const imageUrl = epicClient.buildImageUrl(
            type,
            image.image,
            image.date,
          );

          const dateObj = new Date(image.date);

          return (
            <div key={image.identifier} className="space-y-3">
              <div className="aspect-square overflow-hidden border not-dark:border-transparent dark:border-border">
                <Image
                  src={imageUrl}
                  alt={`EPIC Earth imagery ${image.identifier}`}
                  className="h-full w-full object-cover"
                  width={512}
                  height={512}
                  loading="lazy"
                  unoptimized
                />
              </div>

              <div className="text-sm text-muted-foreground font-mono">
                <p>{format(dateObj, "HH:mm:ss 'UTC'")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
