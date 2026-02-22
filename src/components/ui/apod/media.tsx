import Image from "next/image";

type ImageProps = {
    alt: string;
    url: string;
    hdurl?: string;
    media_type: "image" | "video";
}

export default function APODMedia({ alt, url, hdurl, media_type }: ImageProps) {
    return (
        <div className="w-full">
            {media_type === "image" ? (
                <Image
                    src={hdurl ?? url}
                    alt={alt}
                    width={1024}
                    height={500}
                    placeholder="blur"
                    blurDataURL={url}
                />
            ) : media_type === "video" && (
                <iframe
                    src={url}
                    title={alt}
                    className="absolute inset-0 h-full w-full"
                    allowFullScreen
                />
            )}
        </div>
    );
}