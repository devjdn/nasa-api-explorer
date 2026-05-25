"use client";

import * as React from "react";
import { buildEpicImageUrl } from "@/lib/EPIC/helpers";
import { EpicImage } from "@/lib/EPIC/types";
import Image from "next/image";
import { type EpicImageType } from "@/lib/EPIC/types";
import { Separator } from "../../../separator";
import dynamic from "next/dynamic";
import EPICViewerSlideshowStage, { StageSkeleton } from "./stage";
const EPICViewerThumbnailCarousel = dynamic(
  () => import("./thumbnail-carousel"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full animate-pulse bg-muted" />,
  },
);

type EPICViewerSlideshowProps = {
  currentType: EpicImageType;
  activeImage: EpicImage;
  activeIndex: number;
  setActiveImageAction: (index: number) => void;
  images: Array<EpicImage>;
};

export default function EPICViewerSlideshow({
  currentType,
  activeImage,
  activeIndex,
  setActiveImageAction,
  images,
}: EPICViewerSlideshowProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Preload all images into browser cache */}
      {images.map((image) => (
        <Image
          key={image.identifier}
          src={buildEpicImageUrl(currentType, image.image, image.date)}
          alt=""
          width={0}
          height={800}
          className="hidden"
          unoptimized
          priority
        />
      ))}

      <React.Suspense fallback={<StageSkeleton />}>
        <EPICViewerSlideshowStage
          currentType={currentType}
          activeImage={activeImage}
          activeIndex={activeIndex}
          totalImages={images.length}
          setActiveImageAction={setActiveImageAction}
        />
      </React.Suspense>

      <Separator />

      <div className="flex items-center gap-2 shrink-0 h-24">
        <EPICViewerThumbnailCarousel
          images={images}
          currentType={currentType}
          activeIndex={activeIndex}
          onSelectAction={setActiveImageAction}
        />
      </div>
    </div>
  );
}
