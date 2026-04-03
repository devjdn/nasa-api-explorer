"use client";

import type { EPICViewerProps, ViewerModes, GridSizeOptions } from "../viewer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../accordion";
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
    <aside className="border-b lg:border-r lg:border-b-0 pt-8 lg:pb-8 flex flex-col">
      <div className="space-y-1 px-3 lg:px-8 pb-6">
        <p className="text-base font-medium uppercase font-mono">
          EPIC Controls
        </p>
      </div>

      <Separator />

      <Accordion
        type="multiple"
        defaultValue={["image-filters", "viewer-modes"]}
      >
        <AccordionItem value="image-filters">
          <AccordionTrigger>Image Filters</AccordionTrigger>
          <AccordionContent>
            <EPICImageFilters
              currentType={currentType}
              currentDate={currentDate}
              availableDates={availableDates}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="viewer-modes">
          <AccordionTrigger>Viewer Modes</AccordionTrigger>
          <AccordionContent>
            <EPICViewerModes
              viewerMode={viewerMode}
              setViewerModeAction={setViewerMode}
              gridSize={gridSize}
              setGridSizeAction={setGridSize}
            />
          </AccordionContent>
        </AccordionItem>
        {/*<AccordionItem value="playback-options">
          <AccordionTrigger>Playback Options</AccordionTrigger>
          <AccordionContent>
            <p>Test</p>
          </AccordionContent>
        </AccordionItem>*/}
      </Accordion>
    </aside>
  );
}
