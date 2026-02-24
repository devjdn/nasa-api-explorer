"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp02Icon, Calendar03Icon } from "@hugeicons/core-free-icons";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const FormSchema = z.object({
    date: z.date({
        error: "A date after June 16, 1995 is required",
    }),
});

export function DatePickerForm() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const bstDate = toZonedTime(data.date, "Europe/London");
        const formattedDate = format(bstDate, "yyyy-MM-dd");

        startTransition(() => {
            router.push(`/apod/${formattedDate}`);
        });
    }

    const MIN_DATE = new Date(1995, 5);
    const MAX_DATE = new Date();

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="fixed bottom-2 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-secondary/80 backdrop-blur-lg border border-border/80 p-2 pl-4 flex items-center gap-2 shadow-xl"
            >
                <div className="">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <button
                                                className={cn(
                                                    "w-[240px] flex items-center gap-2 text-sm text-left font-mono hover:cursor-pointer justify-start p-0 has-[>svg]:px-0 font-normal bg-transparent border-none hover:bg-transparent hover:text-current focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
                                                    !field.value &&
                                                    "text-muted-foreground"
                                                )}
                                            >
                                                <HugeiconsIcon size={20} icon={Calendar03Icon} />
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0 rounded-xl"
                                        sideOffset={24}
                                        side="top"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            captionLayout="dropdown"
                                            startMonth={MIN_DATE}
                                            endMonth={MAX_DATE}
                                            disabled={(date) =>
                                                date > MAX_DATE || date < new Date("1995-06-16")
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    size="icon-sm"
                    variant="default"
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? (
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                        <HugeiconsIcon icon={ArrowUp02Icon} />
                    )}
                </Button>
            </form>
        </Form>
    );
}
