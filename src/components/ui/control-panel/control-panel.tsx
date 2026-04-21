"use client";

import * as React from "react";
// import { Separator } from "../separator";
import { cn } from "@/lib/utils";
import { Maximize2Icon, Minimize2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  type ControlPanelType,
  useControlPanelStore,
} from "@/stores/control-panel";
import { DatePickerForm } from "./date-picker";
import { getApodMaxDate } from "@/lib/date-helpers/date-helpers";

type ControlPanelProps = {
  apiName?: string;
};

export default function ControlPanel({ apiName }: ControlPanelProps) {
  const { open, setOpen, toggleOpen, activeControlPanel } =
    useControlPanelStore();
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);
  const hasInitialised = React.useRef(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    function handleMediaChange(event: MediaQueryListEvent) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  React.useEffect(() => {
    if (isMobile === null || hasInitialised.current) return;

    setOpen(!isMobile);
    hasInitialised.current = true;
  }, [isMobile, setOpen]);

  // React.useEffect(() => {
  //   function handlePointerOutside(event: PointerEvent) {
  //     if (!panelRef.current) return;

  //     const target = event.target as HTMLElement;

  //     if (
  //       panelRef.current.contains(target) ||
  //       target.closest("[data-control-panel-safe]") // this is for elements with a data attribute to mark it safe for the control panel
  //     ) {
  //       return;
  //     }

  //     setOpen(false);
  //   }

  //   document.addEventListener("pointerdown", handlePointerOutside);

  //   return () => {
  //     document.removeEventListener("pointerdown", handlePointerOutside);
  //   };
  // }, [setOpen]);

  return (
    <div className="flex justify-end sticky bottom-3 md:bottom-8 @container z-30 pointer-events-none">
      <div
        ref={panelRef}
        className="relative max-w-sm w-full bg-card flex flex-col-reverse select-none md:right-8 border-y @md:border-l md:border-r corner-caps shadow-lg pointer-events-auto"
      >
        <div className="p-3 flex justify-between items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <div
              className={cn(
                "h-2 aspect-square rounded-full transition-colors duration-150",
                open ? "bg-emerald-500" : "bg-neutral-300 dark:bg-muted",
              )}
            />
            <p className="text-xs font-mono uppercase font-medium">
              Control Panel •{" "}
              <span className="text-orange-500">{activeControlPanel}</span>
            </p>
          </span>

          <button onClick={toggleOpen} className="cursor-pointer">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="minimize"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  <Minimize2Icon size={14} />
                </motion.div>
              ) : (
                <motion.div
                  key="maximize"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  <Maximize2Icon size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden border-b"
        >
          <div className="space-y-4">
            <PanelContent panel={activeControlPanel} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PanelContent({ panel }: { panel: ControlPanelType }) {
  switch (panel) {
    case "apod":
      const APOD_MIN_DATE = new Date(1995, 5, 16);
      const APOD_MAX_DATE = getApodMaxDate();
      const APOD_UNAVAILABLE_DATES = ["2026-03-12"];

      return (
        <div className="text-xs font-mono">
          <div className="p-3">
            <DatePickerForm
              minDate={APOD_MIN_DATE}
              maxDate={APOD_MAX_DATE}
              unavailableDates={APOD_UNAVAILABLE_DATES}
              route={"apod"}
            />
          </div>

          {/*<Separator />

          <div className="p-3"></div>*/}
        </div>
      );
    case "epic":
      return (
        <div className="text-xs font-mono space-y-4">
          {/*<div className="p-3">
            <DatePickerForm minDate={} route={"neows"} />
          </div>*/}
        </div>
      );
    case "neows":
      const NEOWS_MIN_DATE = new Date(1900, 1, 1);

      return (
        <div className="text-xs font-mono space-y-4">
          <div className="p-3">
            <DatePickerForm minDate={NEOWS_MIN_DATE} route={"neows"} />
          </div>
        </div>
      );
    default:
      return null;
  }
}
