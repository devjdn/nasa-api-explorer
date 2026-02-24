import { format } from "date-fns";
import type { EpicImage, EpicImageType } from "@/lib/EPIC/types";
import { epicClient } from "@/lib/EPIC/client";
import Image from "next/image";

type EPICImageryProps = {
    images: EpicImage[]; // replace with your proper EpicImage type if you want
    type: EpicImageType;
};

export default function EPICImagery({ images, type }: EPICImageryProps) {
    if (!images.length) {
        return (
            <p className="text-sm text-muted-foreground">
                No imagery available for this selection.
            </p>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => {
                const imageUrl = epicClient.buildImageUrl(
                    type,
                    image.image,
                    image.date
                );

                const dateObj = new Date(image.date);

                return (
                    <div key={image.identifier} className="space-y-3">
                        <div className="aspect-square overflow-hidden border">
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
    );
}