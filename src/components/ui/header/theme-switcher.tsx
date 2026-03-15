"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
    ComputerIcon,
    Moon02Icon,
    Sun03Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

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
            <div className="grid grid-cols-3 p-1 gap-1 bg-secondary border relative corner-caps">
                {THEMES.map(({ value, icon }) => (
                    <div
                        key={value}
                        className={cn(
                            "relative font-mono uppercase h-6 px-1 text-center grid place-items-center cursor-pointer"
                        )}
                    >
                        <p
                            className={cn(
                                "uppercase text-xs z-11 font-mono align-self-center",
                            )}
                        >
                            {value}
                        </p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 p-1 gap-1 bg-secondary border relative corner-caps">
            {THEMES.map(({ value, icon }) => {
                const isActive = theme === value;

                return (
                    <button
                        key={value}
                        onClick={() => setTheme(value)}
                        className={cn(
                            "relative font-mono uppercase h-6 px-1 text-center grid place-items-center cursor-pointer"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="theme-pill"
                                className="absolute inset-0 bg-orange-500"
                                transition={{
                                    type: "tween",
                                    stiffness: 500,
                                    damping: 40,
                                }}
                            />
                        )}

                        <p
                            className={cn(
                                "uppercase text-xs z-11 font-mono align-self-center",
                                isActive && "text-white"
                            )}
                        >
                            {value}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}