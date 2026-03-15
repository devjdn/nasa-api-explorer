import { format, parseISO } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Image01Icon,
    ComputerVideoIcon,
    FileUnknownIcon,
    Copyright,
    Calendar03Icon,
} from "@hugeicons/core-free-icons";
import { Badge } from "../badge";

type DetailsProps = {
    copyright?: string;
    date: string;
    media_type: "image" | "video";
};

export default function APODDetails({
    copyright,
    date,
    media_type,
}: DetailsProps) {
    return (
        <div className="flex gap-1 flex-wrap">
            <Badge variant="secondary">
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
                ) : (
                    <>
                        <HugeiconsIcon size={18} icon={FileUnknownIcon} />
                        <span>Unknown media type</span>
                    </>
                )}
            </Badge>

            <Badge variant="secondary">
                <HugeiconsIcon size={18} icon={Calendar03Icon} />
                <span>{format(parseISO(date), "do MMMM yyyy")}</span>
            </Badge>

            <Badge variant="secondary">
                <HugeiconsIcon size={18} icon={Copyright} />
                <span>{copyright ?? "No copyright holder"}</span>
            </Badge>
        </div>
    );
}