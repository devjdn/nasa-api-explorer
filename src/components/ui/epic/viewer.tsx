"use client";

import { EpicClient, epicClient } from "@/lib/EPIC/client";
import { EpicImage, EpicImageType } from "@/lib/EPIC/types";
import * as React from "react";
import EPICControlSidebar from "./sidebar/control-sidebar";
import Image from "next/image";
import EPICViewerGallery from "./images/gallery";

export type EPICViewerProps = {
  images: Array<EpicImage>;
  currentType: EpicImageType;
  currentDate: string;
  availableDates: Array<string>;
};

export type ViewerModes = "slideshow" | "gallery";
export type GridSizeOptions = "sm" | "default" | "lg";

export default function EPICViewer({
  images,
  currentType,
  currentDate,
  availableDates,
}: EPICViewerProps) {
  const [viewerMode, setViewerMode] = React.useState<ViewerModes>("slideshow");
  const [imageIndex, setImageIndex] = React.useState(0);
  const [gridSize, setGridSize] = React.useState<GridSizeOptions>("sm");
  const activeImage = images[imageIndex];

  const activeImageUrl = epicClient.buildImageUrl(
    currentType,
    activeImage.image,
    activeImage.date,
  );

  return (
    <div className="flex flex-col lg:h-200 lg:grid lg:grid-cols-[300px_1fr]">
      <EPICControlSidebar
        currentType={currentType}
        currentDate={currentDate}
        availableDates={availableDates}
        viewerMode={viewerMode}
        setViewerMode={setViewerMode}
        gridSize={gridSize}
        setGridSize={setGridSize}
      />
      <div className="@container flex-1 overflow-hidden">
        {viewerMode === "slideshow" ? (
          <div className="size-full relative">
            <Image
              src={activeImageUrl}
              alt={activeImage.image}
              fill
              className="w-full h-full object-contain"
              unoptimized
              priority
            />
          </div>
        ) : (
          <EPICViewerGallery
            images={images}
            type={currentType}
            gridSize={gridSize}
          />
        )}
      </div>
    </div>
  );
}
