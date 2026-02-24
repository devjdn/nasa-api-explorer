"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EPIC_IMAGE_TYPES, type EpicImageType } from "@/lib/EPIC/types";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon } from "@hugeicons/core-free-icons";
import { Calendar } from "../calendar";

type ControlsProps = {
    currentType: EpicImageType;
    currentDate: string;
    availableDates: string[];
};

export default function EPICControls({ currentType, currentDate, availableDates }: ControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function handleTypeChange(newType: EpicImageType) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("type", newType);
        params.delete("date");

        router.push(`${pathname}?${params.toString()}`);
    }

    function handleDateChange(newDate: string) {
        const params = new URLSearchParams(searchParams.toString());

        params.set("date", newDate);

        router.push(`${pathname}?${params.toString()}`);
    }

    const selectedDate = new Date(currentDate);
    const timestamps = availableDates.map(
        (d) => new Date(d).getTime()
    );

    const MIN_DATE = new Date(Math.min(...timestamps));
    const MAX_DATE = new Date(Math.max(...timestamps));
    // console.log("currentDate:", currentDate);
    // console.log("selectedDate:", selectedDate);
    // console.log("MIN_DATE:", MIN_DATE);
    // console.log("MAX_DATE:", MAX_DATE);

    return (
        <div className="flex flex-col gap-6 lg:gap-12 lg:flex-row lg:items-center">
            <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground">
                    Image Type
                </p>
                <div className="flex flex-wrap gap-2">
                    {EPIC_IMAGE_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleTypeChange(type)}
                            className={cn(
                                "capitalize text-sm font-mono h-8 px-3 grid place-items-center text-center cursor-pointer",
                                { "bg-orange-600 dark:bg-orange-500 text-primary-foreground dark:text-white": type === currentType },
                                { "hover:bg-secondary transition-colors border": type !== currentType }
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground">
                    Date
                </p>

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className={cn(
                                "capitalize text-sm font-mono h-8 w-[240px] flex items-center text-muted-foreground hover:text-current justify-start gap-2 px-3 text-left cursor-pointer hover:bg-secondary transition-colors border",
                            )}
                        >
                            <HugeiconsIcon size={16} icon={Calendar03Icon} />
                            <span>
                                {format(currentDate, "PPP")}
                            </span>
                        </button>
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
                            disabled={(date) =>
                                date > MAX_DATE || date < MIN_DATE
                            }
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}