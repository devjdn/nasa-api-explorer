import Image from "next/image";

type ImageProps = {
    alt: string;
    url: string;
    hdurl?: string;
    media_type: "image" | "video";
};

export default function APODMedia({
    alt,
    url,
    hdurl,
    media_type,
}: ImageProps) {
    const isDirectVideo = /\.(mp4|webm|mov)$/i.test(url);

    return (
        <div className="w-full">
            {media_type === "image" ? (
                <Image
                    src={hdurl ?? url}
                    alt={alt}
                    width={1024}
                    height={500}
                    placeholder="blur"
                    fetchPriority="high"
                    blurDataURL={url}
                    unoptimized
                />
            ) : media_type === "video" && (
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
                            title={alt}
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    )}
                </div>
            )}
        </div>
    );
}