"use client";

import { EpicImage, EpicImageType } from "@/lib/EPIC/types";
import * as React from "react";
import EPICControlSidebar from "./sidebar/control-sidebar";
import EPICViewerGallery from "./images/gallery";
import { cn } from "@/lib/utils";
import EPICViewerSlideshow from "./images/slideshow";

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
  const activeImage = images[imageIndex] ?? images[0];

  React.useEffect(() => {
    setImageIndex(0);
  }, [currentDate, currentType]);

  return (
    <div
      className={cn(
        "flex flex-col lg:grid lg:grid-cols-[300px_1fr]",
        viewerMode === "slideshow" ? "lg:h-200" : "lg:max-h-unset",
      )}
    >
      <EPICControlSidebar
        currentType={currentType}
        currentDate={currentDate}
        availableDates={availableDates}
        viewerMode={viewerMode}
        setViewerMode={setViewerMode}
        gridSize={gridSize}
        setGridSize={setGridSize}
      />
      <div className="@container flex-1 overflow-hidden border-t lg:border-l lg:border-t-0">
        {viewerMode === "slideshow" ? (
          <EPICViewerSlideshow
            currentType={currentType}
            activeImage={activeImage}
            images={images}
            setActiveImage={setImageIndex}
          />
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
