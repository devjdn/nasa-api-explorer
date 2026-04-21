"use client";
import { Button } from "../../button";
import { GridSizeOptions, ViewerModes } from "../viewer";
import {
  RiSquareLine,
  RiLayoutGridLine,
  RiLayoutGrid2Line,
} from "@remixicon/react";
import * as React from "react";

type ViewerModeProps = {
  viewerMode: ViewerModes;
  setViewerModeAction: (mode: ViewerModes) => void;
  gridSize: GridSizeOptions;
  setGridSizeAction: (size: GridSizeOptions) => void;
};
const viewerModeTypes: ViewerModes[] = ["slideshow", "gallery"];
export default function EPICViewerModes({
  viewerMode,
  setViewerModeAction,
  gridSize,
  setGridSizeAction,
}: ViewerModeProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase text-muted-foreground">
          Viewer Mode
        </p>
        <div className="grid grid-cols-2 gap-2">
          {viewerModeTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setViewerModeAction(type)}
              size={"sm"}
              variant={viewerMode === type ? "default" : "secondary"}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase text-muted-foreground">
          Grid Size
        </p>
        <div className="flex flex-row items-center gap-2">
          <Button
            onClick={() => setGridSizeAction("sm")}
            size={"sm"}
            variant={gridSize === "sm" ? "default" : "secondary"}
            disabled={isMounted && viewerMode === "slideshow"}
          >
            <RiSquareLine />
          </Button>
          <Button
            onClick={() => setGridSizeAction("default")}
            size={"sm"}
            variant={gridSize === "default" ? "default" : "secondary"}
            disabled={isMounted && viewerMode === "slideshow"}
          >
            <RiLayoutGridLine />
          </Button>
          <Button
            onClick={() => setGridSizeAction("lg")}
            size={"sm"}
            variant={gridSize === "lg" ? "default" : "secondary"}
            disabled={isMounted && viewerMode === "slideshow"}
          >
            <RiLayoutGrid2Line />
          </Button>
        </div>
      </div>
    </div>
  );
}
