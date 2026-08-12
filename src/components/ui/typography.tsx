import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyProps = React.HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement
>;

export interface HeadingProps extends TypographyProps {
  as?: "h1" | "h2" | "h3" | "h4";
}

export type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement>;

export const PageEyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "font-mono text-[0.65rem] lg:text-xs uppercase tracking-[0.35em] text-orange-500",
        className,
      )}
      {...props}
    />
  ),
);
PageEyebrow.displayName = "PageEyebrow";

export const PageTitle = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h1", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "font-display font-semibold text-3xl lg:text-4xl supports-text-pretty:text-pretty text-balance",
        className,
      )}
      {...props}
    />
  ),
);
PageTitle.displayName = "PageTitle";

export const HeroTitle = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h1", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "font-medium font-display text-primary text-3xl lg:text-5xl leading-[1.1] text-balance",
        className,
      )}
      {...props}
    />
  ),
);
HeroTitle.displayName = "HeroTitle";

export const SectionTitle = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h2", className, ...props }, ref) => (
    <Tag
      ref={ref}
      className={cn(
        "font-display font-medium text-2xl lg:text-3xl supports-text-pretty:text-pretty text-balance",
        className,
      )}
      {...props}
    />
  ),
);
SectionTitle.displayName = "SectionTitle";

export const SubsectionTitle = React.forwardRef<
  HTMLHeadingElement,
  HeadingProps
>(({ as: Tag = "h3", className, ...props }, ref) => (
  <Tag
    ref={ref}
    className={cn("font-display font-semibold text-lg lg:text-xl", className)}
    {...props}
  />
));
SubsectionTitle.displayName = "SubsectionTitle";

export const MonoBody = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-mono text-sm lg:text-base text-muted-foreground",
      className,
    )}
    {...props}
  />
));
MonoBody.displayName = "MonoBody";

export const MonoSmall = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-mono text-xs lg:text-sm text-muted-foreground/80",
      className,
    )}
    {...props}
  />
));
MonoSmall.displayName = "MonoSmall";
