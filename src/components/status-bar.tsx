"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { OPEN_PALETTE_EVENT } from "@/lib/events";

// A tmux-style status bar. Each section is a numbered "window";
// pressing its number on the keyboard jumps there, just like tmux.
export function StatusBar() {
  const [active, setActive] = useState("about");
  const [time, setTime] = useState("");

  // Highlight whichever section is currently in the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Clock in Bengaluru time. Rendered only after mount to avoid a hydration mismatch.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el?.tagName === "INPUT" || e.metaKey || e.ctrlKey || e.altKey) return;
      const s = sections[Number(e.key)];
      if (s) document.getElementById(s.id)?.scrollIntoView({ block: "start" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-void/85 font-mono text-[0.72rem] backdrop-blur">
      <nav aria-label="Sections" className="mx-auto flex h-10 max-w-6xl items-center gap-4 px-5 sm:px-8">
        <a href="#top" className="shrink-0 bg-phosphor px-1.5 text-void">
          [rp]
        </a>
        <ul className="flex min-w-0 gap-1 overflow-x-auto [scrollbar-width:none]">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={cn(
                  "block whitespace-nowrap px-2 py-0.5 transition-colors",
                  active === s.id ? "text-phosphor glow" : "text-muted hover:text-ink"
                )}
              >
                {i}:{s.label}
                {active === s.id ? "*" : ""}
              </a>
            </li>
          ))}
        </ul>
        <span className="ml-auto hidden shrink-0 text-muted md:inline">
          blr {time || "--:--"} IST
        </span>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          className="ml-auto shrink-0 rounded border border-line px-2 py-0.5 text-muted transition-colors hover:border-phosphor hover:text-phosphor md:ml-0"
          aria-label="Open command palette"
        >
          ctrl k
        </button>
      </nav>
    </header>
  );
}
