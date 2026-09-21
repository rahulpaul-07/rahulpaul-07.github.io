import type { Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { NumberTicker } from "./ui/number-ticker";

// A project's headline number. It counts from `from` to `to` the first time it scrolls into view.
// Screen readers get the plain text; the animated digits are hidden from them.
export function Metric({ metric, className, size = "md" }: { metric: NonNullable<Project["metric"]>; className?: string; size?: "md" | "lg" }) {
  const down = metric.from !== undefined && metric.from > metric.to;
  return (
    <span className={cn("block", className)}>
      <span className="sr-only">{metric.text}</span>
      <span aria-hidden="true" className={cn("block font-mono text-amber", size === "lg" ? "text-3xl" : "text-xl")}>
        {metric.before}
        <NumberTicker
          value={down ? metric.from! : metric.to}
          startValue={down ? metric.to : (metric.from ?? 0)}
          direction={down ? "down" : "up"}
          decimalPlaces={metric.decimals ?? 0}
          delay={0.15}
        />
        {metric.after}
      </span>
      <span className="block text-[0.72rem] text-muted">{metric.label}</span>
    </span>
  );
}
