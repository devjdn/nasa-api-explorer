"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const NASA_APIS = [
    {
        name: "Astronomy Picture of the Day",
        shortName: "APOD",
        href: "/apod",
    },
    {
        name: "EPIC Earth Imagery",
        shortName: "EPIC",
        href: "/epic",
    },
    {
        name: "Near Earth Objects",
        shortName: "NEOs",
        href: "/near-earth-objects",
    },
    {
        name: "Image & Video Library",
        shortName: "Media Library",
        href: "/media-library",
    },
    {
        name: "TechTransfer Patents",
        shortName: "TechTransfer",
        href: "/techtransfer",
    },
];

export default function Header() {
    const pathname = usePathname();
    return (
        <header className="sticky top-0 flex justify-between items-center z-50 lg:grid lg:grid-cols-[auto_1fr_240px] not-dark:bg-primary dark:bg-background not-dark:text-primary-foreground">
            <div className="justify-self-start place-self-center">
                <Link className="group" href={"/"}>
                    <div className="text-white px-3 lg:px-8 py-3">
                        <p className="text-sm font-semibold">
                            NASA API Explorer{" "}
                            <span className="text-orange-500">1.0</span>
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="hidden lg:flex place-self-center">
                <ul className="flex font-mono text-sm">
                    {NASA_APIS.map((api, i) => (
                        <li key={api.href}>
                            {i > 1 ? (
                                <div className="hover:bg-neutral-700 text-white transition-colors py-3 px-3">
                                    <span>{api.shortName}</span>
                                </div>
                            ) : (
                                <Link
                                    href={api.href}
                                    className="group"
                                >
                                    <div className={cn(
                                        "transition-colors p-3 group-hover:bg-orange-500 text-white",
                                        pathname.includes(api.href) && "text-orange-500 hover:text-white"
                                    )}>
                                        <span>{api.shortName}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="justify-self-end hidden h-full lg:block">
                <ThemeSwitcher />
            </div>
            <div className="justify-self-end block lg:hidden">
                <MobileNav />
            </div>
        </header>
    );
}