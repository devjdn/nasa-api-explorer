"use client";

import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

const NASA_APIS = [
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
    return (
        <header className="sticky top-0 lg:grid lg:grid-cols-[auto_1fr_240px] not-dark:bg-black dark:bg-background not-dark:text-primary-foreground">
            <div className="justify-self-start place-self-center">
                <Link className="group" href={"/"}>
                    <div className="group-hover:bg-orange-600 dark:group-hover:bg-orange-500 text-white transition-colors px-4 lg:px-8 py-3">
                        <p className="text-sm font-semibold">
                            NASA API Explorer{" "}
                            <span className="text-orange-600 dark:text-orange-500 group-hover:text-black dark:group-hover:text-black transition-colors">1.0</span>
                        </p>
                    </div>
                </Link>
            </div>

            <nav className="hidden lg:flex place-self-center">
                <ul className="flex font-mono text-sm">
                    {NASA_APIS.map((api, i) => (
                        <li key={api.href}>
                            {i > 0 ? (
                                <div className="hover:bg-neutral-700 text-white transition-colors py-3 px-4">
                                    <span>{api.shortName}</span>
                                </div>
                            ) : (
                                <Link
                                    href={api.href}
                                    className="group"
                                >
                                    <div className="group-hover:bg-orange-500 text-white transition-colors py-3 px-4">
                                        <span>{api.shortName}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="place-self-end">
                <ThemeSwitcher />
            </div>
        </header>
    );
}