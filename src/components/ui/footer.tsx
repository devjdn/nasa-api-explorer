import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="px-3 lg:px-8 py-16 bg-primary dark:bg-secondary dark:border-t text-primary-foreground dark:text-foreground">
            <div className="space-y-8">
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
                    <div className="max-w-5xl space-y-4">
                        <h2 className="font-medium text-xl">
                            NASA API Explorer
                        </h2>
                        <p className="font-mono text-sm text-muted-foreground max-w-prose">
                            An independent interface built to explore publicly available data from NASA&apos;s open APIs, including astronomy imagery, Earth observation and near-Earth object tracking.
                        </p>
                    </div>

                    <Separator className="not-dark:bg-neutral-700 dark:bg-border lg:hidden" />


                    <div className="space-y-4">
                        <h3 className="text-sm text-muted-foreground">
                            Explore
                        </h3>
                        <div className="flex flex-col gap-2 font-mono text-sm">
                            <Link href="/apod" className="hover:text-orange-500 transition-colors">
                                APOD
                            </Link>
                            <Link href="/epic" className="hover:text-orange-500 transition-colors">
                                EPIC
                            </Link>
                            <Link href="/neos" className="hover:text-orange-500 transition-colors">
                                Near-Earth Objects
                            </Link>
                            <Link href="/media-library" className="hover:text-orange-500 transition-colors">
                                Media Library
                            </Link>
                            <Link href="/techtransfer" className="hover:text-orange-500 transition-colors">
                                Tech Transfer
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm text-muted-foreground">
                            Resources
                        </h3>
                        <div className="flex flex-col gap-2 font-mono text-sm">
                            <a
                                href="https://api.nasa.gov/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 transition-colors"
                            >
                                NASA Open APIs
                            </a>
                            <a
                                href="https://epic.gsfc.nasa.gov"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-orange-500 transition-colors"
                            >
                                EPIC GSFC
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="not-dark:bg-neutral-700 dark:bg-border" />

                <div className="flex flex-col md:flex-row justify-between gap-6 text-xs font-mono text-muted-foreground">
                    <p>
                        Data provided by NASA Open APIs. This project is not affiliated with or endorsed by NASA.
                    </p>
                    <p>
                        © {new Date().getFullYear()} NASA API Explorer
                    </p>
                </div>

            </div>
        </footer>
    );
}