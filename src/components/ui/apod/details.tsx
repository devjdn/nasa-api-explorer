import { format, parseISO } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import { Image01Icon, ComputerVideoIcon, FileUnknownIcon, Copyright, Calendar03Icon } from "@hugeicons/core-free-icons";
import { Separator } from "../separator";

type DetailsProps = {
    copyright?: string;
    date: string;
    media_type: "image" | "video";
}

export default function APODDetails({ copyright, date, media_type }: DetailsProps) {

    return (
        <div className="inline-flex gap-3 flex-wrap text-sm text-muted-foreground [&_svg]:stroke-muted-foreground leading-tight">
            <div className="inline-flex items-center gap-1">
                {media_type === "image" ? (
                    <>
                        <HugeiconsIcon size={18} icon={Image01Icon} />
                        <span>Image</span>
                    </>
                ) : media_type === "video" ? (
                    <>
                        <HugeiconsIcon size={18} icon={ComputerVideoIcon} />
                        <span>Video</span>
                    </>
                ) : media_type !== "image" || media_type === "video" && (
                    <>
                        <HugeiconsIcon size={18} icon={FileUnknownIcon} />
                        <span>Unknown media type</span>
                    </>
                )}
            </div>
            <Separator className="h-5! bg-border" orientation="vertical" />
            <div className="inline-flex items-center gap-1">
                <HugeiconsIcon size={18} icon={Calendar03Icon} />
                <span>{format(parseISO(date), "do MMMM yyyy")}</span>
            </div>
            <Separator className="h-5! bg-border" orientation="vertical" />
            <div className="inline-flex items-center gap-1">
                <HugeiconsIcon size={18} icon={Copyright} />
                <span>{copyright ?? "No copyright holder"}</span>
            </div>
        </div>
    );
}