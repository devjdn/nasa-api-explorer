import { RiCloseLargeLine, RiFullscreenLine } from "@remixicon/react";
import { Button } from "../../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import Image from "next/image";

type ImageModalProps = {
  title: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  isDirectVideo?: boolean;
};

export default function APODImageModal({
  title,
  url,
  hdurl,
  media_type,
  isDirectVideo,
}: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="ghost">
          <RiFullscreenLine />
          <span>Click to view fullscreen</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-lvh w-screen max-w-screen sm:max-w-[unset] border-0 block space-y-8 p-3 lg:p-8"
        aria-describedby="Fullscreen image modal"
        showCloseButton={false}
      >
        <DialogHeader className="flex flex-row items-center justify-between gap-4">
          <DialogTitle>{title}</DialogTitle>
          <DialogClose asChild>
            <Button size={"icon-sm"} variant={"ghost"}>
              <RiCloseLargeLine />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="h-full relative">
          {media_type === "image" ? (
            <Image
              src={hdurl ?? url}
              alt={title}
              preload
              fill
              className="object-center object-contain"
              placeholder="blur"
              fetchPriority="high"
              blurDataURL={url}
              unoptimized
            />
          ) : (
            media_type === "video" &&
            (isDirectVideo ? (
              <video
                controls
                className="absolute inset-0 w-full h-full"
                preload="metadata"
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={url}
                title={title}
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
