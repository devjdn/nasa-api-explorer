import parse, {
  domToReact,
  Element,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";

const options: HTMLReactParserOptions = {
  replace(node) {
    if (!(node instanceof Element)) return;

    // Drop the "Explanation:" label NASA includes, since we already render
    // our own heading above.
    if (node.name === "strong") {
      const first = node.children[0];
      if (
        first &&
        "data" in first &&
        first.data.trim().toLowerCase() === "explanation:"
      ) {
        return <></>;
      } else {
        return (
          <strong>{domToReact(node.children as DOMNode[], options)}</strong>
        );
      }
    }

    // Style links and open them in a new tab.
    if (node.name === "a") {
      return (
        <a
          href={node.attribs.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:opacity-80"
        >
          {domToReact(node.children as DOMNode[], options)}
        </a>
      );
    }

    // Never render embedded scripts, styles or iframes from the HTML.
    if (["script", "style", "iframe"].includes(node.name)) {
      return <></>;
    }
  },
};

export function APODExplanation({ explanation }: { explanation?: string }) {
  return (
    <div className="space-y-gutter max-w-2xl mx-auto">
      <p className="text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-foreground">
        {explanation ? parse(explanation, options) : "No explanation provided."}
      </p>
    </div>
  );
}
