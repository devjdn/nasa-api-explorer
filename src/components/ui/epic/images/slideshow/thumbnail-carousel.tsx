"use client";

import type { EpicImage } from "@/lib/EPIC/types";
import { epicClient } from "@/lib/EPIC/client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { EPICViewerProps } from "../../viewer";
import clsx from "clsx";

type EPICViewerThumbailCarouselProps = Pick<EPICViewerProps, "currentType"> & {
  images: EpicImage[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function EPICViewerThumbnailCarousel({
  images,
  currentType,
  activeIndex,
  onSelect,
}: EPICViewerThumbailCarouselProps) {
  return (
    <Carousel
      className="w-full h-full grid grid-cols-[auto_1fr_auto]"
      opts={{
        align: "start",
        containScroll: "keepSnaps",
        dragFree: true,
      }}
    >
      <CarouselPrevious
        className="static translate-y-0 h-full border-r"
        variant="ghost"
        size="icon-sm"
      />
      <CarouselContent className="h-full">
        {images.map((image, i) => (
          <CarouselItem
            className="h-full basis-auto w-auto border-r last-of-type:border-r-0"
            key={image.identifier}
          >
            <button
              onClick={() => onSelect(i)}
              className="h-full cursor-pointer relative isolate aspect-square object-center object-cover"
            >
              <Image
                src={epicClient.buildImageUrl(
                  currentType,
                  image.image,
                  image.date,
                )}
                alt={image.caption}
                width={96}
                height={96}
                className=" z-1"
                unoptimized
              />
              <div
                className={clsx(
                  "absolute inset-0 z-2",
                  activeIndex === i && "border-2 border-orange-500",
                )}
              />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext
        className="static translate-y-0 h-full border-l"
        variant="ghost"
        size="icon-sm"
      />
    </Carousel>
  );
}
