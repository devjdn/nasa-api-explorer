"use client";

import type { EPICViewerProps, ViewerModes, GridSizeOptions } from "../viewer";
import { Separator } from "../../separator";
import EPICImageFilters from "./image-filters";
import EPICViewerModes from "./viewer-modes";

type EPICSidebarControlsProps = Pick<
  EPICViewerProps,
  "currentType" | "currentDate" | "availableDates"
> & {
  viewerMode: ViewerModes;
  setViewerMode: (mode: ViewerModes) => void;
  gridSize: GridSizeOptions;
  setGridSize: (size: GridSizeOptions) => void;
};

export default function EPICControlSidebar({
  currentType,
  currentDate,
  availableDates,
  viewerMode,
  setViewerMode,
  gridSize,
  setGridSize,
}: EPICSidebarControlsProps) {
  return (
    <aside className="pt-8 lg:pb-8 flex flex-col lg:h-200 lg:self-start lg:sticky lg:top-14 lg:left-0">
      <div className="space-y-1 px-3 lg:px-8 pb-6">
        <p className="text-base font-medium uppercase font-mono">
          EPIC Controls
        </p>
      </div>

      <Separator />

      <div className="*:px-3 lg:*:px-8 pb-6">
        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Image Filters
            </h3>
          </div>
          <EPICImageFilters
            currentType={currentType}
            currentDate={currentDate}
            availableDates={availableDates}
          />
        </div>
        <Separator />
        <div className="py-3 space-y-6">
          <div>
            <h3 className="text-sm font-medium uppercase font-mono">
              Viewer Modes
            </h3>
          </div>
          <EPICViewerModes
            viewerMode={viewerMode}
            setViewerModeAction={setViewerMode}
            gridSize={gridSize}
            setGridSizeAction={setGridSize}
          />
        </div>
      </div>
    </aside>
  );
}
