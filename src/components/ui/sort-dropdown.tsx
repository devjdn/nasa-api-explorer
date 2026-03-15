"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

type SortOption<T extends string> = {
    label: string;
    value: T;
    icon: LucideIcon;
};

type SortDropdownProps<T extends string> = {
    value: T;
    options: SortOption<T>[];
    onChange: (value: T) => void;
};

export default function SortDropdown<T extends string>({
    value,
    options,
    onChange,
}: SortDropdownProps<T>) {

    return (
        <Select value={value} onValueChange={(v) => onChange(v as T)}>
            <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>

            <SelectContent position="popper">
                <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>

                    {options.map((option) => {
                        const Icon = option.icon;

                        return (
                            <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                    <Icon size={16} />
                                    {option.label}
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}