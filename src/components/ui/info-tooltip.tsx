"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog";
import { useMediaQuery } from "@uidotdev/usehooks";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

type InfoTooltipProps = {
    title: string;
    info: string;
    iconSize: number;
}

export default function InfoTooltip({ title, info, iconSize }: InfoTooltipProps) {
    const isSmall = useMediaQuery("only screen and (max-width : 1024px");

    return (
        <>
            {isSmall ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="size-fit text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500">
                            <HugeiconsIcon size={iconSize} icon={InformationCircleIcon} />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="bg-secondary rounded-none border">
                        <DialogTitle>
                            {title}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            {info}
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            ) : (
                <Tooltip>
                    <TooltipTrigger className="size-fit text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500">
                        <HugeiconsIcon size={iconSize} icon={InformationCircleIcon} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {info}
                    </TooltipContent>
                </Tooltip>
            )}
        </>
    );
}