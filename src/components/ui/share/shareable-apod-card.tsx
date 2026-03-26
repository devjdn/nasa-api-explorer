import Image from "next/image";

type ShareableApodCardProps = {
  title: string;
  date: string;
  copyright?: string;
  imageUrl: string;
  onImageLoad?: () => void;
};

export default function ShareableApodCard({
  title,
  date,
  copyright,
  imageUrl,
  onImageLoad,
}: ShareableApodCardProps) {
  return (
    <div className="relative isolate w-full">
      <Image
        key={imageUrl}
        alt={title}
        src={imageUrl}
        width={1920}
        height={1080}
        onLoad={onImageLoad}
        className="w-full h-auto object-center object-cover aspect-4/5 max-w-mda"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-80% to-black/70 p-6 flex flex-col space-y-1 justify-end">
        <h1
          className="font-semibold text-base text-white text-pretty"
          style={{ fontFamily: "Inter Tight, system-ui, sans-serif" }}
        >
          {title}
        </h1>
        <p
          className="text-white/90 text-sm font-normal"
          // style={{ fontFamily: "Inter, system-ui, sans-serif" }}
        >
          <span>{date}</span> {copyright && <span> • {copyright}</span>}
        </p>
      </div>
    </div>
  );
}
