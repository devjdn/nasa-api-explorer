import Image from "next/image";
import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";
import { Separator } from "../../separator";

type ImageProps = {
  title: string;
  date: string;
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
          className="text-foreground underline underline-offset-4 hover:opacity-80"
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
  date,
  credit,
  copyright,
  hdurl,
  media_type,
}: ImageProps) {
  const isDirectVideo = /\.(mp4|webm|mov)$/i.test(hdurl);
  const creditText = credit ?? copyright;

  return (
    <div className="w-full pb-8" data-component="media">
      {/* ...media block unchanged... */}

      <Separator className="mb-8" />

      <div className="px-3 lg:px-8 space-y-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground/80">Credit: </span>
          {creditText
            ? parse(creditText, creditOptions)
            : "No listed credit (may be visible in the media)"}
        </div>
      </div>
    </div>
  );
}
