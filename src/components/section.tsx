import { cn } from "@/lib/utils";
import { BlurFade } from "./ui/blur-fade";

/** The italic serif accent. At most one phrase per headline. */
export function Em({ children, className }: { children: React.ReactNode; className?: string }) {
  return <em className={cn("font-serif text-[1.08em] font-normal italic tracking-normal", className)}>{children}</em>;
}

/** A numbered section: label in the left column on wide screens, content on the right. */
export function Section({
  id,
  n,
  label,
  title,
  lede,
  children,
  className,
}: {
  id: string;
  n: string;
  label: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-rule", className)}>
      <div className="mx-auto grid max-w-[1120px] gap-x-12 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[180px_minmax(0,1fr)]">
        <p className="mb-4 font-mono text-[12px] uppercase tracking-[.14em] text-muted lg:sticky lg:top-24 lg:self-start">
          <span className="text-ink">§{n}</span> {label}
        </p>
        <div className="min-w-0">
          <BlurFade>
            <h2
              id={`${id}-title`}
              className="max-w-[24ch] text-balance text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[42px]"
            >
              {title}
            </h2>
            {lede && <p className="mt-5 max-w-[64ch] text-[16px] leading-[1.65] text-body">{lede}</p>}
          </BlurFade>
          {children}
        </div>
      </div>
    </section>
  );
}
