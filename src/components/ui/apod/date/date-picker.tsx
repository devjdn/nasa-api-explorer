"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
import { CalendarDays, ArrowUp } from "lucide-react";

interface DatePickerFormProps {
    minDate: Date;
    maxDate: Date;
    route: string;
}

const FormSchema = z.object({
    date: z.date({
        error: "A valid date is required",
    }),
});

export function DatePickerForm({ minDate, maxDate, route }: DatePickerFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const formattedDate = format(data.date, "yyyy-MM-dd");

        startTransition(() => {
            router.push(`/${route}/${formattedDate}`);
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-2 w-full"
            >
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <button
                                            className={cn(
                                                "max-w-[210px] w-full bg-input h-8 px-3 flex items-center gap-2 text-xs text-left font-mono uppercase hover:cursor-pointer justify-start font-normal hover:text-current focus-visible:ring-0 focus-visible:ring-offset-0",
                                                !field.value &&
                                                "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarDays size={14} />
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </button>
                                    </FormControl>
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
                                        disabled={(date) =>
                                            date > maxDate || date < minDate
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormItem>
                    )}
                />


                <Button
                    size="icon-sm"
                    variant="default"
                    type="submit"
                    disabled={isPending}
                    className="rounded-none cursor-pointer"
                >
                    {isPending ? (
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                        <ArrowUp />
                    )}
                </Button>
            </form>
        </Form>
    );
}
