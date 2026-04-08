"use client";

import { epicClient } from "@/lib/EPIC/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EpicImage } from "@/lib/EPIC/types";
import Image from "next/image";
import { EPICViewerProps } from "../viewer";
import { Separator } from "../../separator";

type EPICViewerSlideshowProps = Pick<EPICViewerProps, "currentType"> & {
  activeImage: EpicImage;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  images: Array<EpicImage>;
};

export default function EPICViewerSlideshow({
  currentType,
  activeImage,
  setActiveImage,
  images,
}: EPICViewerSlideshowProps) {
  const activeImageUrl = epicClient.buildImageUrl(
    currentType,
    activeImage.image,
    activeImage.date,
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <div className="flex-1 min-h-0 h-full mx-auto relative">
          <Image
            src={activeImageUrl}
            alt={activeImage.caption}
            width={1024}
            height={1024}
            className="object-contain w-full h-auto lg:w-auto mx-auto lg:h-full"
            unoptimized
            priority
          />
        </div>
      </div>
      <Separator />
      <div className="flex items-center gap-2 shrink-0 h-24">
        <Carousel
          className="w-full h-full grid grid-cols-[auto_1fr_auto]"
          opts={{
            align: "start",
            containScroll: "trimSnaps",
            dragFree: true,
          }}
        >
          <CarouselPrevious
            className="static translate-y-0 h-full border-r"
            variant={"ghost"}
            size={"icon-sm"}
          />
          <CarouselContent className="h-full">
            {images.map((image, i) => (
              <CarouselItem
                className="h-full basis-auto w-auto border-r last-of-type:border-r-0"
                key={image.identifier}
              >
                <button
                  onClick={() => setActiveImage(i)}
                  className="h-full cursor-pointer"
                >
                  <Image
                    src={epicClient.buildImageUrl(
                      currentType,
                      image.image,
                      image.date,
                    )}
                    alt={image.caption}
                    width={300}
                    height={300}
                    className="h-full w-auto object-contain"
                    unoptimized
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext
            className="static translate-y-0 h-full border-l"
            variant={"ghost"}
            size={"icon-sm"}
          />
        </Carousel>
      </div>
    </div>
  );
}
