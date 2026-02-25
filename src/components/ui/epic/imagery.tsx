"use client";

import { format } from "date-fns";
import type { EpicImage, EpicImageType } from "@/lib/EPIC/types";
import { epicClient } from "@/lib/EPIC/client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareIcon, LayoutGrid, GridTableIcon } from "@hugeicons/core-free-icons";

type EPICImageryProps = {
    images: EpicImage[]; // replace with your proper EpicImage type if you want
    type: EpicImageType;
};

type LayoutOptions = | "sm" | "default" | "lg";

export default function EPICImagery({ images, type }: EPICImageryProps) {
    const [layout, setLayout] = useState<LayoutOptions>("default");

    if (!images.length) {
        return (
            <p className="text-sm text-muted-foreground">
                No imagery available for this selection.
            </p>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="font-medium">{images.length} Images</p>
                </div>
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => setLayout("sm")}
                        className={cn(
                            "capitalize text-sm font-mono h-8 aspect-square grid place-items-center text-center cursor-pointer",
                            { "bg-orange-600 dark:bg-orange-500 text-primary-foreground dark:text-white": layout === "sm" },
                            { "hover:bg-secondary transition-colors border": layout !== "sm" }
                        )}
                    >
                        <HugeiconsIcon size={16} icon={SquareIcon} />
                    </button>
                    <button
                        onClick={() => setLayout("default")}
                        className={cn(
                            "capitalize text-sm font-mono h-8 aspect-square grid place-items-center text-center cursor-pointer",
                            { "bg-orange-600 dark:bg-orange-500 text-primary-foreground dark:text-white": layout === "default" },
                            { "hover:bg-secondary transition-colors border": layout !== "default" }
                        )}
                    >
                        <HugeiconsIcon size={16} icon={LayoutGrid} />
                    </button>
                    <button
                        onClick={() => setLayout("lg")}
                        className={cn(
                            "capitalize text-sm font-mono h-8 aspect-square grid place-items-center text-center cursor-pointer",
                            { "bg-orange-600 dark:bg-orange-500 text-primary-foreground dark:text-white": layout === "lg" },
                            { "hover:bg-secondary transition-colors border": layout !== "lg" }
                        )}
                    >
                        <HugeiconsIcon size={16} icon={GridTableIcon} />
                    </button>
                </div>
            </div>
            <div
                className={cn(
                    "grid",
                    layout === "sm" &&
                    "gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
                    layout === "default" &&
                    "gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                    layout === "lg" &&
                    "gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                )}
            >
                {images.map((image) => {
                    const imageUrl = epicClient.buildImageUrl(
                        type,
                        image.image,
                        image.date
                    );

                    const dateObj = new Date(image.date);

                    return (
                        <div key={image.identifier} className="space-y-3">
                            <div className="aspect-square overflow-hidden border not-dark:border-transparent dark:border-border">
                                <Image
                                    src={imageUrl}
                                    alt={`EPIC Earth imagery ${image.identifier}`}
                                    className="h-full w-full object-cover"
                                    width={512}
                                    height={512}
                                    loading="lazy"
                                    unoptimized
                                />
                            </div>

                            <div className="text-sm text-muted-foreground">
                                <p>{format(dateObj, "PPP")}</p>
                                <p>{format(dateObj, "HH:mm:ss 'UTC'")}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}