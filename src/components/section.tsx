import { cn } from "@/lib/utils";

// Every section opens with the shell command that would "print" it.
export function Section({
  id,
  command,
  title,
  children,
  className,
}: {
  id: string;
  command: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("relative py-20 sm:py-28", className)}>
      <p className="font-mono text-[0.75rem] text-muted">
        <span className="text-phosphor-dim">$</span> {command}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-3 font-mono text-2xl font-medium tracking-tight text-ink sm:text-3xl"
        style={{ fontStretch: "112.5%" }}
      >
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}
