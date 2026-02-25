"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    ComputerIcon,
    Moon02Icon,
    Sun03Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const THEMES = [
    { value: "light", icon: Sun03Icon },
    { value: "dark", icon: Moon02Icon },
    { value: "system", icon: ComputerIcon },
] as const;

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="grid grid-cols-3 h-full">
                {THEMES.map(({ value, icon }) => (
                    <div
                        key={value}
                        className="flex items-center justify-center px-3"
                    >
                        <HugeiconsIcon size={16} icon={icon} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className="grid grid-cols-3 h-full"
            role="tablist"
            aria-label="Theme switcher"
        >
            {THEMES.map(({ value, icon }) => {
                const isActive = theme === value;

                return (
                    <button
                        key={value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setTheme(value)}
                        className={cn(
                            "flex items-center justify-center p-3 transition-colors",
                            !isActive && "hover:bg-neutral-700",
                            isActive && "bg-orange-500 text-white font-medium"
                        )}
                    >
                        <HugeiconsIcon size={16} icon={icon} />
                    </button>
                );
            })}
        </div>
    );
}