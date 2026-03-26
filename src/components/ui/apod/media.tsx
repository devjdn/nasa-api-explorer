import Image from "next/image";
import ShareActions from "../share/share-actions";

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
    <div className="space-y-4 w-full">
      <div className="w-full">
        {media_type === "image" ? (
          <Image
            src={hdurl ?? url}
            alt={title}
            width={1024}
            height={500}
            className="h-auto"
            placeholder="blur"
            fetchPriority="high"
            blurDataURL={url}
            unoptimized
          />
        ) : (
          media_type === "video" && (
            <div className="relative w-full aspect-video">
              {isDirectVideo ? (
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
              )}
            </div>
          )
        )}
      </div>
      <ShareActions
        title={title}
        date={date}
        copyright={copyright ?? undefined}
        externalUrl={url}
        mediaUrl={media_type === "image" ? (hdurl ?? url) : undefined}
      />
    </div>
  );
}
