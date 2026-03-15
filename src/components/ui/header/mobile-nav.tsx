"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu09Icon, X } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { NASA_APIS } from "@/lib/nasa-apis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./theme-switcher";

export default function MobileNav() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    function toggle() {
        setOpen((prev) => !prev);
        document.body.style.overflowY = open ? "auto" : "hidden";
    }

    function close() {
        setOpen(false);
    }

    return (
        <>
            <button
                type="button"
                aria-expanded={open}
                aria-controls="mobile-nav"
                onClick={toggle}
                className={cn(
                    "flex items-center justify-center p-3",
                )}
            >
                {open ? <HugeiconsIcon icon={X} /> : <HugeiconsIcon icon={Menu09Icon} />}
            </button>

            {open && (
                <div
                    id="mobile-nav"
                    role="dialog"
                    aria-modal="true"
                    className="fixed top-12 left-0 flex flex-col gap-4 w-full bg-background z-50 h-[calc(100dvh-48px)] px-3 py-8"
                >
                    <nav className="flex-1">
                        <ul className="space-y-4 font-mono text-3xl">
                            {NASA_APIS.map((api, i) => (
                                <li key={api.href}>
                                    {i > 2 ? (
                                        <div className="text-neutral-700">
                                            <span>{api.shortName}</span>
                                        </div>
                                    ) : (
                                        <Link
                                            href={api.href}
                                            className="group"
                                            onClick={close}
                                        >
                                            <div className={cn(
                                                "text-foreground",
                                                pathname.includes(api.href) && "text-orange-500"
                                            )}>
                                                <span>{api.shortName}</span>
                                            </div>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="w-fit">
                        <ThemeSwitcher />
                    </div>
                </div>
            )}
        </>
    );
}