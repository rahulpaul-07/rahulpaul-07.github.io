"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Copy, CornerDownLeft, FileText, FolderOpen, Hash, Music, Search, SquareTerminal } from "lucide-react";
import { person, projects, sections } from "@/data/portfolio";
import { asset, cn } from "@/lib/utils";
import { FOCUS_TERMINAL_EVENT, OPEN_PALETTE_EVENT, PLAY_MUSIC_EVENT, openProject, scrollToSection } from "@/lib/events";

type Item = {
  id: string;
  group: "Go to" | "Projects" | "Links" | "Actions";
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

function buildItems(): Item[] {
  const open = (url: string) => window.open(url, "_blank", "noopener");
  return [
    ...sections.map((s) => ({
      id: `go-${s.id}`,
      group: "Go to" as const,
      label: s.label[0].toUpperCase() + s.label.slice(1),
      icon: Hash,
      run: () => scrollToSection(s.id),
    })),
    ...projects.map((p) => ({
      id: `p-${p.id}`,
      group: "Projects" as const,
      label: p.name,
      hint: p.tagline,
      icon: FolderOpen,
      run: () => openProject(p.id),
    })),
    { id: "l-gh", group: "Links", label: "GitHub", icon: ArrowUpRight, run: () => open(person.links.github) },
    { id: "l-li", group: "Links", label: "LinkedIn", icon: ArrowUpRight, run: () => open(person.links.linkedin) },
    { id: "l-lc", group: "Links", label: "LeetCode", icon: ArrowUpRight, run: () => open(person.links.leetcode) },
    { id: "a-resume", group: "Actions", label: "Open résumé (PDF)", icon: FileText, run: () => open(asset(person.resume)) },
    {
      id: "a-email",
      group: "Actions",
      label: "Copy email address",
      hint: person.email,
      icon: Copy,
      run: () => navigator.clipboard?.writeText(person.email).catch(() => {}),
    },
    {
      id: "a-music",
      group: "Actions",
      label: "Play my playlist",
      icon: Music,
      run: () => {
        scrollToSection("interests");
        window.dispatchEvent(new Event(PLAY_MUSIC_EVENT));
      },
    },
    {
      id: "a-term",
      group: "Actions",
      label: "Open the terminal",
      icon: SquareTerminal,
      run: () => window.dispatchEvent(new Event(FOCUS_TERMINAL_EVENT)),
    },
  ];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const items = useMemo(() => buildItems(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  // Ctrl+K / Cmd+K anywhere, plus the event other components fire.
  useEffect(() => {
    const show = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, show);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    setOpen(false);
    returnFocus.current?.focus?.();
  }

  function choose(item: Item | undefined) {
    if (!item) return;
    setOpen(false);
    item.run();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  // keep the highlighted row in view while arrowing through a long list
  useEffect(() => {
    document.getElementById(`cmd-${results[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  // Portals need document.body, which only exists in the browser.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[85] flex items-start justify-center px-3 pt-[14vh]">
          <motion.div
            className="absolute inset-0 bg-void/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-line bg-panel shadow-[0_0_80px_-20px_rgb(125_255_179/0.35)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search sections, projects, links…"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmd-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                className="h-12 w-full bg-transparent font-mono text-sm text-ink placeholder:text-muted focus:outline-none focus-visible:outline-none"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-muted">esc</kbd>
            </div>

            <ul id="cmd-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-[0.8rem] text-muted">
                  No match for &quot;{query}&quot;. Try a project name or &quot;email&quot;.
                </li>
              )}
              {results.map((item, i) => {
                const header = i === 0 || results[i - 1].group !== item.group ? item.group : null;
                const Icon = item.icon;
                return (
                  <li key={item.id} role="presentation">
                    {header && <p className="px-3 pb-1 pt-3 font-mono text-[0.65rem] text-muted">{header}</p>}
                    <div
                      id={`cmd-${item.id}`}
                      role="option"
                      aria-selected={i === active}
                      onMouseMove={() => setActive(i)}
                      onClick={() => choose(item)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5",
                        i === active ? "bg-phosphor/10 text-phosphor" : "text-ink"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.92rem]">{item.label}</span>
                        {item.hint && <span className="block truncate text-[0.75rem] text-muted">{item.hint}</span>}
                      </span>
                      {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
