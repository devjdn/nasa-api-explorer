import { cn } from "@/lib/utils";

type StatProps = {
    label: string;
    stat: number | string | undefined;
    className?: string;
}

export default function Stat({ label, stat, className }: StatProps) {
    return (
        <div className={cn(
            "border bg-card px-4 py-3 space-y-1",
            className
        )}>
            <p className="text-xs md:text-sm text-muted-foreground">{label}</p>
            <p className="text-lg md:text-xl font-mono font-semibold">{stat}</p>
        </div>
    );
}