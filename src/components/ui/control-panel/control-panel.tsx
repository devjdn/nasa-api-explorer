"use client";

import * as React from "react";
import { Separator } from "../separator";
import { cn } from "@/lib/utils";
import { Maximize2Icon, Minimize2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type ControlPanelType, useControlPanelStore } from "@/stores/control-panel";
import { DatePickerForm } from "../apod/date/date-picker";



type ControlPanelProps = {
    apiName: string;
}

export default function ControlPanel({ apiName }: ControlPanelProps) {
    const { open, setOpen, toggleOpen, activeControlPanel } = useControlPanelStore();
    const panelRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        function handlePointerOutside(event: PointerEvent) {
            if (!panelRef.current) return;

            const target = event.target as HTMLElement;

            if (
                panelRef.current.contains(target) ||
                target.closest("[data-control-panel-safe]") // this is for elements with a data attribute to mark it safe for the control panel
            ) {
                return;
            }

            setOpen(false);
        }

        document.addEventListener("pointerdown", handlePointerOutside);

        return () => {
            document.removeEventListener("pointerdown", handlePointerOutside);
        }
    }, [setOpen]);

    return (
        <div className="flex justify-end sticky bottom-2 md:bottom-8 @container z-30">
            <div ref={panelRef} className="relative max-w-md w-full bg-card md:justify-end flex flex-col-reverse md:right-3 border-y @md:border-l md:border-r corner-caps">
                <div className="p-3 flex justify-between items-center gap-4">
                    <span className="inline-flex items-center gap-2">
                        <div className={cn(
                            "h-2 aspect-square rounded-full transition-colors duration-150",
                            open ? "bg-emerald-500" : "bg-neutral-300 dark:bg-muted"
                        )} />
                        <p className="text-xs font-mono uppercase font-medium">Control Panel • <span className="text-orange-500">{activeControlPanel}</span></p>

                    </span>

                    <button
                        onClick={toggleOpen}
                        className="cursor-pointer"
                    >
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
                        opacity: open ? 1 : 0
                    }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden border-b"
                >
                    <div className="p-3 space-y-4">
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
            const MIN_DATE = new Date(1995, 5, 16);
            const MAX_DATE = new Date();
            return (
                <div className="text-xs font-mono space-y-4">
                    <div className="space-y-1">
                        <DatePickerForm minDate={MIN_DATE} maxDate={MAX_DATE} route={"apod"} />
                    </div>
                </div>
            );
        case "epic":
            return <div className="text-xs font-mono">EPIC Controls</div>;
        case "neows":
            return <div className="text-xs font-mono">NEOWS Controls</div>;
        default:
            return null;
    }
}