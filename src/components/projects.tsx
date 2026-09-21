"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { moreRepos, projects, type Project } from "@/data/portfolio";
import { asset, cn } from "@/lib/utils";
import { Section } from "./section";
import { MagicCard } from "./ui/magic-card";
import { ReconDiagram } from "./recon-diagram";
import { Metric } from "./metric";
import { Safari } from "./ui/safari";
import { GithubActivity } from "./github-activity";
import { OPEN_PROJECT_EVENT } from "@/lib/events";

function Thumb({ src, name, className }: { src: string; name: string; className?: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;
  return (
    // Plain <img>: a static export has no image optimiser.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt={`Screenshot of ${name}`}
      loading="lazy"
      onError={() => setBroken(true)}
      className={cn("w-full rounded-md border border-line object-cover object-top", className)}
    />
  );
}

function Card({ p, onOpen }: { p: Project; onOpen: (p: Project, el: HTMLElement) => void }) {
  const big = p.size === "lg";
  return (
    <motion.li layoutId={`card-${p.id}`} className={cn("list-none rounded-xl", big ? "md:col-span-2 lg:col-span-4 lg:row-span-2" : "lg:col-span-2")}>
      <MagicCard
        className="h-full rounded-xl"
        gradientSize={260}
        gradientColor="rgb(125 255 179 / 0.06)"
        gradientFrom="#7dffb3"
        gradientTo="#2f7a57"
      >
        <button
          type="button"
          onClick={(e) => onOpen(p, e.currentTarget)}
          aria-haspopup="dialog"
          className="flex h-full w-full flex-col p-5 text-left sm:p-6"
        >
          {p.diagram === "recon" && <ReconDiagram className="mb-4 hidden sm:flex" />}
          {p.image && !big && <Thumb src={p.image} name={p.name} className="mb-5 aspect-[16/9] opacity-80 transition-opacity group-hover:opacity-100" />}

          {p.period && <span className="font-mono text-[0.68rem] text-muted">{p.period}</span>}
          <span className={cn("mt-1 font-mono text-ink group-hover:text-phosphor", big ? "text-2xl" : "text-lg")}>{p.name}</span>
          <span className="mt-2 text-[0.95rem] text-muted">{p.tagline}</span>

          <span className="mt-auto flex items-end justify-between gap-4 pt-6">
            {p.metric ? (
              <Metric metric={p.metric} size={big ? "lg" : "md"} />
            ) : (
              <span className="font-mono text-[0.7rem] text-muted">{p.stack.slice(0, 3).join(", ")}</span>
            )}
            <span className="shrink-0 font-mono text-[0.72rem] text-phosphor-dim group-hover:text-phosphor">details</span>
          </span>
        </button>
      </MagicCard>
    </motion.li>
  );
}

function Detail({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  // The beam diagram measures its nodes, so draw it only once the open animation has settled.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Portal to <body> so the dialog sits above the dock and status bar.
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <motion.div
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${p.id}`}
        onLayoutAnimationComplete={() => setSettled(true)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`dlg-${p.id}`}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-xl border border-phosphor-dim bg-panel shadow-[0_0_80px_-20px_rgb(125_255_179/0.35)]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-panel/95 px-5 py-3 font-mono text-[0.72rem] text-muted backdrop-blur sm:px-7">
          <span>
            <span className="text-phosphor-dim">$</span> cat projects/{p.id}/README
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded p-1 text-muted hover:text-phosphor"
            aria-label="Close project details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 pb-7 pt-5 sm:px-7">
          {p.period && <p className="font-mono text-[0.72rem] text-muted">{p.period}</p>}
          <h3 id={`dlg-${p.id}`} className="mt-1 font-mono text-2xl text-ink">
            {p.name}
          </h3>
          <p className="mt-2 text-muted">{p.tagline}</p>

          {p.metric && <Metric metric={p.metric} size="lg" className="mt-5" />}

          {p.diagram === "recon" &&
            (settled ? (
              <ReconDiagram className="mt-6 rounded-lg border border-line" />
            ) : (
              <div className="mt-6 h-[252px] rounded-lg border border-line" />
            ))}
          {p.image && (
            <Safari
              className="mt-6"
              imageSrc={asset(p.image)}
              url={new URL(p.links[0].href).host}
              aria-label={`Screenshot of ${p.name}`}
              role="img"
            />
          )}

          <ul className="mt-6 space-y-3">
            {p.points.map((pt) => (
              <li key={pt.slice(0, 24)} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.3rem] font-mono text-[0.75rem] text-phosphor-dim">
                  &gt;
                </span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-[0.7rem]" aria-label="Tech stack">
            {p.stack.map((s) => (
              <li key={s} className="rounded border border-line px-2 py-1 text-muted">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3 font-mono text-[0.78rem]">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-3 py-2 transition-colors",
                  i === 0 ? "bg-phosphor text-void hover:shadow-[0_0_24px_rgb(125_255_179/0.5)]" : "border border-line text-ink hover:border-phosphor hover:text-phosphor"
                )}
              >
                {l.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((p: Project, el: HTMLElement | null) => {
    opener.current = el;
    setActive(p);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    // hand focus back to the card that opened the dialog
    setTimeout(() => opener.current?.focus(), 0);
  }, []);

  // The terminal's `open <project>` command lands here.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const p = projects.find((x) => x.id === (e as CustomEvent<string>).detail);
      if (p) open(p, null);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, [open]);

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 380, damping: 36 }}>
      <Section id="projects" command="ls -l projects/" title="Projects">
        <ul className="grid auto-rows-auto gap-4 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((p) => (
            <Card key={p.id} p={p} onOpen={open} />
          ))}
        </ul>

        <div className="mt-16">
          <p className="font-mono text-[0.75rem] text-muted">
            <span className="text-phosphor-dim">$</span> ls ~/github --more
          </p>
          <ul className="mt-4 grid gap-x-10 divide-y divide-line border-y border-line md:grid-cols-2 md:divide-y-0">
            {moreRepos.map((r) => (
              <li key={r.name} className="md:border-b md:border-line">
                <a href={r.url} target="_blank" rel="noreferrer" className="group block py-4">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="truncate font-mono text-[0.85rem] text-ink group-hover:text-phosphor">{r.name}</span>
                    <span className="shrink-0 font-mono text-[0.7rem] text-muted">{r.lang}</span>
                  </span>
                  <span className="mt-1 block text-[0.92rem] text-muted">{r.desc}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <GithubActivity />
      </Section>

      <AnimatePresence>{active && <Detail key={active.id} p={active} onClose={close} />}</AnimatePresence>
    </MotionConfig>
  );
}
