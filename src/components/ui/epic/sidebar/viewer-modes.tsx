"use client";

import { Button } from "../../button";
import { useEPICViewer } from "../viewer-context";
import {
  RiSquareLine,
  RiLayoutGridLine,
  RiLayoutGrid2Line,
} from "@remixicon/react";

const viewerModeTypes = ["slideshow", "gallery"] as const;

export default function EPICViewerModes() {
  const { viewerMode, setViewerMode, gridSize, setGridSize } = useEPICViewer();

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
              onClick={() => setViewerMode(type)}
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
            onClick={() => setGridSize("sm")}
            size={"sm"}
            variant={gridSize === "sm" ? "default" : "secondary"}
            disabled={viewerMode === "slideshow"}
          >
            <RiSquareLine />
          </Button>
          <Button
            onClick={() => setGridSize("default")}
            size={"sm"}
            variant={gridSize === "default" ? "default" : "secondary"}
            disabled={viewerMode === "slideshow"}
          >
            <RiLayoutGridLine />
          </Button>
          <Button
            onClick={() => setGridSize("lg")}
            size={"sm"}
            variant={gridSize === "lg" ? "default" : "secondary"}
            disabled={viewerMode === "slideshow"}
          >
            <RiLayoutGrid2Line />
          </Button>
        </div>
      </div>
    </div>
  );
}
