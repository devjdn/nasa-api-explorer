"use client";

import * as React from "react";
import Image from "next/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { buildEpicImageUrl } from "@/lib/EPIC/helpers";
import { EpicImage, type EpicImageType } from "@/lib/EPIC/types";
import { Button } from "../../../button";

type EPICViewerSlideshowStageProps = {
  currentType: EpicImageType;
  activeImage: EpicImage;
  activeIndex: number;
  totalImages: number;
  setActiveImageAction: (index: number) => void;
};

export default function EPICViewerSlideshowStage({
  currentType,
  activeImage,
  activeIndex,
  totalImages,
  setActiveImageAction,
}: EPICViewerSlideshowStageProps) {
  const activeImageUrl = React.useMemo(
    () => buildEpicImageUrl(currentType, activeImage.image, activeImage.date),
    [currentType, activeImage.image, activeImage.date],
  );

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === totalImages - 1;

  return (
    <div className="flex-1 min-h-0 grid grid-rows-[auto_32px] grid-cols-2 lg:flex">
      <Button
        onClick={() => setActiveImageAction(Math.max(0, activeIndex - 1))}
        variant="ghost"
        size="icon-sm"
        className="lg:h-full w-full lg:w-8 border-t lg:border-t-0 lg:border-r row-start-2 row-end-3 col-start-1 col-end-2 lg:inline-flex"
        disabled={isAtStart}
        suppressHydrationWarning
      >
        <RiArrowLeftSLine />
      </Button>

      <div className="flex-1 min-h-0 h-full mx-auto relative bg-black row-start-1 row-end-2 col-start-1 col-end-3">
        <Image
          src={activeImageUrl}
          alt={activeImage.caption}
          width={900}
          height={900}
          sizes="100vw"
          className="object-contain w-full h-auto lg:w-auto mx-auto lg:h-full"
          unoptimized
          priority
          loading="eager"
        />
      </div>

      <Button
        onClick={() =>
          setActiveImageAction(Math.min(totalImages - 1, activeIndex + 1))
        }
        variant="ghost"
        size="icon-sm"
        className="lg:h-full w-full lg:w-8 border-t lg:border-t-0 border-l row-start-2 row-end-3 col-start-2 col-end-3 lg:inline-flex"
        disabled={isAtEnd}
        suppressHydrationWarning
      >
        <RiArrowRightSLine />
      </Button>
    </div>
  );
}

export function StageSkeleton() {
  return (
    <div className="flex-1 min-h-0 grid grid-rows-[auto_32px] grid-cols-2 lg:flex">
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:h-full w-full lg:w-8 border-t lg:border-t-0 lg:border-r row-start-2 row-end-3 col-start-1 col-end-2 lg:inline-flex"
        disabled={true}
      >
        <RiArrowLeftSLine />
      </Button>

      <div className="flex-1 min-h-0 h-full mx-auto relative bg-black row-start-1 row-end-2 col-start-1 col-end-3" />

      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:h-full w-full lg:w-8 border-t lg:border-t-0 border-l row-start-2 row-end-3 col-start-2 col-end-3 lg:inline-flex"
        disabled={true}
      >
        <RiArrowRightSLine />
      </Button>
    </div>
  );
}
