"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  CalendarDays,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Shuffle,
} from "lucide-react";
import {
  getDefaultMaxDate,
  getRandomDate,
} from "@/lib/date-helpers/date-helpers";

interface DatePickerFormProps {
  minDate: Date;
  maxDate?: Date;
  unavailableDates?: string[];
  route: string;
}

const FormSchema = z.object({
  date: z.date({
    error: "A valid date is required",
  }),
});

export function DatePickerForm({
  minDate,
  maxDate,
  unavailableDates,
  route,
}: DatePickerFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const resolvedMaxDate = maxDate ?? getDefaultMaxDate();
  const unavailableDateSet = new Set(
    unavailableDates?.map((d) => format(new Date(d), "yyyy-MM-dd")) ?? [],
  );
  const isDateDisabled = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return (
      unavailableDateSet.has(formatted) ||
      date > resolvedMaxDate ||
      date < minDate
    );
  };
  function findNextValidDate(start: Date, direction: 1 | -1) {
    const next = new Date(start);

    while (true) {
      next.setUTCDate(next.getUTCDate() + direction);

      // stop if out of bounds
      if (next < minDate || next > resolvedMaxDate) {
        return null;
      }

      if (!isDateDisabled(next)) {
        return next;
      }
    }
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = format(data.date, "yyyy-MM-dd");

    startTransition(() => {
      router.push(`/${route}/${formattedDate}`);
    });
  }

  function backOneDay() {
    const { date } = form.getValues();
    if (!date) return;

    const prev = findNextValidDate(date, -1);
    if (!prev) return;

    form.setValue("date", prev);
  }

  function forwardOneDay() {
    const { date } = form.getValues();
    if (!date) return;

    const next = findNextValidDate(date, 1);
    if (!next) return;

    form.setValue("date", next);
  }

  function goMostRecent() {
    const mostRecent = resolvedMaxDate;
    form.setValue("date", mostRecent);
  }

  function goRandom() {
    let attempts = 0;
    const MAX_ATTEMPTS = 50;

    while (attempts < MAX_ATTEMPTS) {
      const randomDate = getRandomDate(minDate, resolvedMaxDate);

      if (!isDateDisabled(randomDate)) {
        form.setValue("date", randomDate);
        return;
      }

      attempts++;
    }

    form.setValue("date", resolvedMaxDate);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-2 w-full"
      >
        <FieldGroup>
          <Controller
            name="date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="w-full">
                <div className="flex items-center bg-background w-full border">
                  {/* Back a day */}
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    className="shadow-none"
                    onClick={backOneDay}
                    disabled={
                      !field.value || field.value <= minDate || isPending
                    }
                  >
                    <ArrowLeft size={14} />
                  </Button>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex-1 h-8 flex items-center gap-2 px-3 text-xs text-left border-x font-mono uppercase justify-start font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={isPending}
                      >
                        <CalendarDays size={14} />
                        {field.value ? (
                          format(field.value, "PP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-0 rounded-none"
                      sideOffset={24}
                      side="top"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                        startMonth={minDate}
                        endMonth={maxDate}
                        disabled={(date) => {
                          const formatted = format(date, "yyyy-MM-dd");
                          return (
                            unavailableDateSet.has(formatted) ||
                            date > resolvedMaxDate ||
                            date < minDate
                          );
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Forward a day */}
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="ghost"
                    className="shadow-none"
                    onClick={forwardOneDay}
                    disabled={
                      !field.value ||
                      field.value >= resolvedMaxDate ||
                      isPending
                    }
                  >
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          size="icon-sm"
          variant="default"
          type="submit"
          className="grid place-items-center"
          disabled={isPending}
        >
          {isPending ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <ArrowUp />
          )}
        </Button>
      </form>

      <div className="grid grid-cols-2 gap-x-2">
        <Button
          size={"sm"}
          variant={"outline"}
          className="uppercase text-xs"
          onClick={goMostRecent}
          disabled={isPending || form.getValues().date === resolvedMaxDate}
        >
          Most Recent
        </Button>
        <Button
          size={"sm"}
          variant={"outline"}
          className="uppercase text-xs"
          onClick={goRandom}
          disabled={isPending}
        >
          <Shuffle className="size-3.5" size={14} />
          Random
        </Button>
      </div>
    </div>
  );
}
