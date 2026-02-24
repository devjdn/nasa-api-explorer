"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ComputerIcon,
    Moon02Icon,
    Sun03Icon,
} from "@hugeicons/core-free-icons";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const THEMES = [
    { value: "light", label: "Light", icon: Sun03Icon },
    { value: "dark", label: "Dark", icon: Moon02Icon },
    { value: "system", label: "System", icon: ComputerIcon },
] as const;

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        const id = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(id);
    }, []);

    const currentTheme =
        THEMES.find((t) => t.value === theme) ??
        THEMES[resolvedTheme === "dark" ? 1 : 0];

    return (
        <Popover>
            <PopoverTrigger
                className={cn(
                    "flex items-center justify-center gap-2 font-mono text-sm text-white transition-colors py-3 px-8 outline-none border-0 w-36",
                    "hover:bg-orange-600 dark:hover:bg-orange-500",
                    "data-[state=open]:bg-orange-600 dark:data-[state=open]:bg-orange-500"
                )}
                aria-label="Theme"
            >
                {mounted ? (
                    <>
                        <HugeiconsIcon size={16} icon={currentTheme.icon} />
                        <span>{currentTheme.label}</span>
                    </>
                ) : (
                    <>
                        <HugeiconsIcon size={16} icon={ComputerIcon} />
                        <span>Theme</span>
                    </>
                )}
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="bottom"
                alignOffset={8}
                sideOffset={0}
                className={cn(
                    "w-[--radix-popover-trigger-width] min-w-32 p-0 rounded-none border-neutral-700",
                    "bg-black dark:bg-neutral-950",
                    "not-dark:border-neutral-800"
                )}
            >
                <ul className="font-mono text-sm">
                    {THEMES.map(({ value, label, icon }) => {
                        const isActive = mounted && theme === value;
                        return (
                            <li key={value}>
                                <button
                                    type="button"
                                    onClick={() => setTheme(value)}
                                    className={cn(
                                        "w-full flex items-center gap-2 px-4 py-3 text-left text-white transition-colors",
                                        "hover:bg-orange-600 dark:hover:bg-orange-500",
                                        isActive &&
                                        "bg-orange-600 dark:bg-orange-500 text-black font-medium"
                                    )}
                                >
                                    <HugeiconsIcon size={16} icon={icon} className="shrink-0" />
                                    {label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </PopoverContent>
        </Popover>
    );
}
