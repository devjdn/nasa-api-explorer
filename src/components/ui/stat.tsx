import { cn } from "@/lib/utils";

type StatProps = {
  label: string;
  stat: number | string | undefined;
  className?: string;
};

export default function Stat({ label, stat, className }: StatProps) {
  return (
    <div className={cn("bg-card px-4 py-3 space-y-1 relative", className)}>
      <p className="text-xs text-muted-foreground uppercase font-mono">
        {label}
      </p>
      <p className="text-base md:text-xl font-mono font-medium">{stat}</p>
    </div>
  );
}
