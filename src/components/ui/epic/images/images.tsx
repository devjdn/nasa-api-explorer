"use client";

import * as React from "react";
import { type EpicImage, type EpicImageType } from "@/lib/EPIC/types";
import { useEPICViewer } from "../viewer-context";
import { cn } from "@/lib/utils";
import EPICViewerSlideshow from "./slideshow/slideshow";
import EPICViewerGallery from "./gallery/gallery";

type EPICViewerImagesProps = {
  images: EpicImage[];
  currentType: EpicImageType;
  currentDate: string;
};

export default function EPICViewerImages({
  images,
  currentType,
  currentDate,
}: EPICViewerImagesProps) {
  const { viewerMode, gridSize, imageIndex, setImageIndex } = useEPICViewer();

  const clampedIndex = Math.min(imageIndex, images.length - 1);
  const activeImage = React.useMemo(
    () => images[clampedIndex] ?? images[0],
    [images, clampedIndex],
  );

  React.useEffect(() => {
    setImageIndex(0);
  }, [currentDate, currentType, setImageIndex]);

  return (
    <div
      className={cn(
        "@container flex-1 overflow-hidden border-t lg:border-l lg:border-t-0",
        viewerMode === "slideshow" && "lg:h-200",
      )}
    >
      {viewerMode === "slideshow" ? (
        <EPICViewerSlideshow
          currentType={currentType}
          activeImage={activeImage}
          activeIndex={clampedIndex}
          images={images}
          setActiveImageAction={setImageIndex}
        />
      ) : (
        <EPICViewerGallery
          images={images}
          type={currentType}
          gridSize={gridSize}
        />
      )}
    </div>
  );
}
