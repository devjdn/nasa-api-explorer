"use client";

import * as React from "react";
import ObjectGrid from "./objects-grid";
import SortDropdown from "../sort-dropdown";
import type { NeoObject } from "@/lib/nasa/types";
import { SectionTitle } from "../typography";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  LocateFixed,
  Locate,
  CircleDot,
  Circle,
} from "lucide-react";
import { parse } from "date-fns";
import { Separator } from "../separator";

type SortOption =
  | "time-asc"
  | "time-desc"
  | "diameter-asc"
  | "diameter-desc"
  | "distance-asc"
  | "distance-desc";

const asteroidSortOptions = [
  { label: "Earliest", value: "time-asc", icon: CalendarArrowDown },
  { label: "Latest", value: "time-desc", icon: CalendarArrowUp },

  { label: "Closest", value: "distance-asc", icon: LocateFixed },
  { label: "Farthest", value: "distance-desc", icon: Locate },

  { label: "Smallest", value: "diameter-asc", icon: CircleDot },
  { label: "Largest", value: "diameter-desc", icon: Circle },
] satisfies {
  label: string;
  value: SortOption;
  icon: React.ComponentType<{ className?: string }>;
}[];

export default function ObjectSection({ neo }: { neo: NeoObject[] }) {
  const [sort, setSort] = React.useState<SortOption>("time-asc");

  const sortedNeo = React.useMemo(() => {
    const copy = [...neo];

    copy.sort((a, b) => {
      const aApproach = a.close_approach_data[0];
      const bApproach = b.close_approach_data[0];

      const aTime = parse(
        aApproach.close_approach_date_full,
        "yyyy-MMM-dd HH:mm",
        new Date(),
      ).getTime();
      const bTime = parse(
        bApproach.close_approach_date_full,
        "yyyy-MMM-dd HH:mm",
        new Date(),
      ).getTime();

      const aDiameter =
        (a.estimated_diameter.meters.estimated_diameter_min +
          a.estimated_diameter.meters.estimated_diameter_max) /
        2;
      const bDiameter =
        (b.estimated_diameter.meters.estimated_diameter_min +
          b.estimated_diameter.meters.estimated_diameter_max) /
        2;

      const aDistance = Number(aApproach.miss_distance.kilometers);
      const bDistance = Number(bApproach.miss_distance.kilometers);

      switch (sort) {
        case "time-asc":
          return aTime - bTime;
        case "time-desc":
          return bTime - aTime;
        case "diameter-asc":
          return aDiameter - bDiameter;
        case "diameter-desc":
          return bDiameter - aDiameter;
        case "distance-asc":
          return aDistance - bDistance;
        case "distance-desc":
          return bDistance - aDistance;
        default:
          return 0;
      }
    });

    return copy;
  }, [neo, sort]);

  return (
    <section className="">
      <div className="py-8 px-3 lg:px-8 flex flex-row justify-between gap-8 items-center">
        <SectionTitle>Objects</SectionTitle>
        <SortDropdown
          value={sort}
          onChange={setSort}
          options={asteroidSortOptions}
        />
      </div>

      <Separator />

      <ObjectGrid neo={sortedNeo} />
    </section>
  );
}
