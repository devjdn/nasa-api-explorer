"use client";

import * as React from "react";
import { epicClient } from "@/lib/EPIC/client";
import { EpicImage } from "@/lib/EPIC/types";
import Image from "next/image";
import { EPICViewerProps } from "../../viewer";
import { Separator } from "../../../separator";
import dynamic from "next/dynamic";
import EPICViewerSlideshowStage from "./stage";
const EPICViewerThumbnailCarousel = dynamic(
  () => import("./thumbnail-carousel"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full animate-pulse bg-muted" />,
  },
);

type EPICViewerSlideshowProps = Pick<EPICViewerProps, "currentType"> & {
  activeImage: EpicImage;
  activeIndex: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
  images: Array<EpicImage>;
};

export default function EPICViewerSlideshow({
  currentType,
  activeImage,
  activeIndex,
  setActiveImage,
  images,
}: EPICViewerSlideshowProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Preload all images into browser cache */}
      {images.map((image) => (
        <Image
          key={image.identifier}
          src={epicClient.buildImageUrl(currentType, image.image, image.date)}
          alt=""
          width={0}
          height={800}
          className="hidden"
          unoptimized
          priority
        />
      ))}

      <EPICViewerSlideshowStage
        currentType={currentType}
        activeImage={activeImage}
        activeIndex={activeIndex}
        totalImages={images.length}
        setActiveImage={setActiveImage}
      />

      <Separator />

      <div className="flex items-center gap-2 shrink-0 h-24">
        <EPICViewerThumbnailCarousel
          images={images}
          currentType={currentType}
          activeIndex={activeIndex}
          onSelect={setActiveImage}
        />
      </div>
    </div>
  );
}
