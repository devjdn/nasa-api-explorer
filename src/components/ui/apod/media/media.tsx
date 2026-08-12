import Image from "next/image";
import APODImageModal from "./image-modal";
import { Separator } from "../../separator";

type ImageProps = {
  title: string;
  date: string;
  copyright?: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
};

export default function APODMedia({
  title,
  date,
  copyright,
  url,
  hdurl,
  media_type,
}: ImageProps) {
  const isDirectVideo = /\.(mp4|webm|mov)$/i.test(url);

  return (
    <div className="w-full pb-8" data-component="media">
      <div className="w-full aspect-3/2 relative">
        {media_type === "image" ? (
          <Image
            src={url}
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

      {/*<APODImageModal
        key={hdurl ?? url}
        title={title}
        url={hdurl ?? url}
        hdurl={hdurl ?? undefined}
        media_type={media_type}
        isDirectVideo={isDirectVideo}
      />*/}

      <Separator className="mb-8" />

      <div className="px-3 lg:px-8 space-y-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">Credit: </span>{" "}
          {copyright ??
            "No listed copyright holder (May be visible in the media)"}
        </p>
      </div>
    </div>
  );
}
