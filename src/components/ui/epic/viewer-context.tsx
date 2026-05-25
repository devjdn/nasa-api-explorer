"use client";

import * as React from "react";

export type ViewerModes = "slideshow" | "gallery";
export type GridSizeOptions = "sm" | "default" | "lg";

type EPICViewerContextType = {
  viewerMode: ViewerModes;
  setViewerMode: (mode: ViewerModes) => void;
  gridSize: GridSizeOptions;
  setGridSize: (size: GridSizeOptions) => void;
  imageIndex: number;
  setImageIndex: (index: number) => void;
};

const EPICViewerContext = React.createContext<EPICViewerContextType | null>(
  null,
);

export function EPICViewerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewerMode, setViewerMode] = React.useState<ViewerModes>("slideshow");
  const [gridSize, setGridSize] = React.useState<GridSizeOptions>("sm");
  const [imageIndex, setImageIndex] = React.useState(0);

  return (
    <EPICViewerContext.Provider
      value={{
        viewerMode,
        setViewerMode,
        gridSize,
        setGridSize,
        imageIndex,
        setImageIndex,
      }}
    >
      {children}
    </EPICViewerContext.Provider>
  );
}

export function useEPICViewer() {
  const context = React.useContext(EPICViewerContext);
  if (!context) {
    throw new Error("useEPICViewer must be used within EPICViewerProvider");
  }
  return context;
}
