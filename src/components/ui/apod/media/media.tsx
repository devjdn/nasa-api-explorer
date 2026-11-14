import Image from "next/image";
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";

type ImageProps = {
  title: string;
  credit?: string;
  copyright?: string;
  hdurl: string;
  media_type: "image" | "video";
};

// Credit text is inline content, so unwrap any <p> (a <p> inside a <p> or a
// <span> breaks hydration) and style/open links in a new tab.
const creditOptions: HTMLReactParserOptions = {
  replace(node) {
    if (!(node instanceof Element)) return;

    if (node.name === "p") {
      return <>{domToReact(node.children as DOMNode[], creditOptions)}</>;
    }

    if (node.name === "a") {
      return (
        <a
          href={node.attribs.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:opacity-80"
        >
          {domToReact(node.children as DOMNode[], creditOptions)}
        </a>
      );
    }

    if (["script", "style", "iframe"].includes(node.name)) {
      return <></>;
    }
  },
};

export default function APODMedia({
  title,
  credit,
  copyright,
  hdurl,
  media_type,
}: ImageProps) {
  const isDirectVideo = /\.(mp4|webm|mov)$/i.test(hdurl);
  const creditText = credit ?? copyright;

  return (
    <div className="w-full space-y-snug" data-component="media">
      <div className="w-full aspect-3/2 relative bg-muted">
        {media_type === "image" ? (
          <Image
            src={hdurl}
            alt={title}
            preload
            fill
            className="object-center object-contain"
            placeholder="blur"
            fetchPriority="high"
            blurDataURL={hdurl}
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
              <source src={hdurl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={hdurl}
              title={title}
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ))
        )}
      </div>

      <div className="text-sm text-muted-foreground text-center max-w-2xl mx-auto w-full">
        <span className="font-medium text-foreground/80">Credit: </span>
        {creditText
          ? parse(creditText, creditOptions)
          : "No listed credit (may be visible in the media)"}
      </div>
    </div>
  );
}
