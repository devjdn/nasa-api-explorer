"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "../../popover";
import { EPIC_IMAGE_TYPES, type EpicImageType } from "@/lib/EPIC/types";
import { format } from "date-fns";
import { RiCalendar2Line } from "@remixicon/react";
import { Calendar } from "../../calendar";
import { Button } from "../../button";

type ControlsProps = {
  currentType: EpicImageType;
  currentDate: string;
  availableDates: string[];
};

export default function EPICImageFilters({
  currentType,
  currentDate,
  availableDates,
}: ControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleTypeChange(newType: EpicImageType) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("type", newType);
    params.delete("date");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleDateChange(newDate: string) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("date", newDate);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedDate = new Date(currentDate);
  const timestamps = availableDates.map((d) => new Date(d).getTime());
  const availableDateSet = new Set(
    availableDates.map((d) => format(new Date(d), "yyyy-MM-dd")),
  );

  const MIN_DATE = new Date(Math.min(...timestamps));
  const MAX_DATE = new Date(Math.max(...timestamps));
  // console.log("currentDate:", currentDate);
  // console.log("selectedDate:", selectedDate);
  // console.log("MIN_DATE:", MIN_DATE);
  // console.log("MAX_DATE:", MAX_DATE);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-mono uppercase text-muted-foreground">
          Image Type
        </p>
        <div className="grid grid-cols-2 gap-2">
          {EPIC_IMAGE_TYPES.map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeChange(type)}
              size={"sm"}
              variant={type === currentType ? "default" : "secondary"}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 items-center">
          <div>
            <p className="text-xs font-mono uppercase text-muted-foreground">
              Date
            </p>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-full justify-start"
              size={"sm"}
              variant={"outline"}
            >
              <RiCalendar2Line />
              <span>{format(currentDate, "PPP")}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={12}
            side="bottom"
            align="start"
            className="rounded-none w-auto p-0"
          >
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;

                const formatted = format(date, "yyyy-MM-dd");
                handleDateChange(formatted);
              }}
              captionLayout="dropdown"
              startMonth={MIN_DATE}
              endMonth={MAX_DATE}
              disabled={(date) => {
                const formatted = format(date, "yyyy-MM-dd");

                return (
                  date < MIN_DATE ||
                  date > MAX_DATE ||
                  !availableDateSet.has(formatted)
                );
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
