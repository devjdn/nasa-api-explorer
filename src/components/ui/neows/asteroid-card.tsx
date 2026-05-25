"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Stat from "@/components/ui/stat";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NeoObject } from "@/lib/nasa/types";
import { motion, AnimatePresence } from "motion/react";
import { format } from "date-fns-tz";
import AsteroidSizeChart from "./asteroid-size-chart";
import { parse } from "date-fns";
import { RiAddLine } from "@remixicon/react";

type AsteroidCardProps = {
  neo: NeoObject;
  formattedKm: string;
  velocity: number;
  orbitingBody: string;
  estimatedDiameterRange: string;
};

export function AsteroidCard({
  neo,
  formattedKm,
  velocity,
  orbitingBody,
  estimatedDiameterRange,
}: AsteroidCardProps) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <Card className="border-0 border-b sm:nth-[2n+1]:border-r xl:nth-[3n+1]:border-r xl:nth-[3n+2]:border-r xl:nth-[3n]:border-r-0">
      <CardHeader className="flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="space-y-1 flex-1 min-w-0">
          <CardTitle className="uppercase font-medium font-mono">
            {neo.name}
          </CardTitle>
          <CardDescription className="uppercase font-normal font-mono">{`ID ${neo.id}`}</CardDescription>
        </div>

        <span
          className={cn(
            "text-xs px-2 py-1 font-mono whitespace-nowrap shrink-0",
            neo.is_potentially_hazardous_asteroid
              ? "bg-red-500/10 text-red-500"
              : "bg-emerald-500/10 text-emerald-500",
          )}
        >
          {neo.is_potentially_hazardous_asteroid
            ? "Potentially Hazardous"
            : "Not Hazardous"}
        </span>
      </CardHeader>

      <Separator />

      <CardContent className="px-0 *:px-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Stat
            className="border-none p-0"
            label="Time"
            stat={format(
              parse(
                neo.close_approach_data[0].close_approach_date_full,
                "yyyy-MMM-dd HH:mm",
                new Date(0),
              ),
              "HH:mm 'UTC'",
              { timeZone: "UTC" },
            )}
          />
          <Stat
            className="border-none p-0"
            label="Closest Approach"
            stat={`${formattedKm} km`}
          />
          <Stat
            className="border-none p-0"
            label="Velocity"
            stat={`${velocity.toFixed(2)} km/s`}
          />
          <Stat
            className="border-none p-0"
            label="Orbiting Body"
            stat={orbitingBody}
          />
          <Stat
            className="border-none p-0 col-span-2"
            label="Estimated Diameter Range"
            stat={estimatedDiameterRange}
          />
        </div>

        <Separator />

        <div className="relative z-20 flex items-center justify-between gap-4">
          <p
            className={cn(
              "text-muted-foreground text-xs relative uppercase font-mono",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={overlayOpen ? "close" : "show"}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-block"
                transition={{ duration: 0 }}
              >
                {overlayOpen
                  ? "Show asteroid details"
                  : "Show asteroid size comparison"}
              </motion.span>
            </AnimatePresence>
          </p>
          <button
            type="button"
            onClick={() => setOverlayOpen((open) => !open)}
            aria-expanded={overlayOpen}
            aria-label={
              overlayOpen
                ? "Close size comparison"
                : "Show asteroid size comparison"
            }
            className="cursor-pointer"
          >
            <RiAddLine
              className={cn(
                "transition-transform duration-200",
                overlayOpen && "rotate-45 transition-transform",
              )}
            />
          </button>
        </div>
      </CardContent>
      <AnimatePresence>
        {overlayOpen && (
          <motion.div
            className="absolute inset-0 z-10 bg-secondary"
            aria-hidden
            key={neo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="h-full w-full p-6 flex flex-col">
              <div className="space-y-1">
                <h3 className="font-medium uppercase font-mono leading-none">
                  {neo.name} Size Visualisation
                </h3>
                {/* <p className="text-sm text-muted-foreground">Reference: Football Pitch - 105 m</p> */}
              </div>
              <div className="pb-6 flex-1 grid justify-start items-center">
                <AsteroidSizeChart
                  name={neo.name}
                  maxDiameter={
                    neo.estimated_diameter.meters.estimated_diameter_max
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
