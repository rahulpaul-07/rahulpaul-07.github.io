"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";

import { projects, TAGS, type Project, type Tag } from "@/data/portfolio";
import { asset, cn } from "@/lib/utils";
import { ReconDiagram } from "./recon-diagram";
import { Em, Section } from "./section";
import { NumberTicker } from "./ui/number-ticker";

function Metric({ metric, className }: { metric: NonNullable<Project["metric"]>; className?: string }) {
  return (
    <span className={cn("block", className)}>
      <span className="sr-only">{metric.text}</span>
      <span aria-hidden className="block font-mono text-[22px] font-medium text-accent sm:text-[26px]">
        {metric.before}
        <NumberTicker value={metric.to} decimalPlaces={metric.decimals ?? 0} delay={0.1} />
        {metric.after}
      </span>
      <span className="block text-[12.5px] leading-snug text-muted">{metric.label}</span>
    </span>
  );
}

// Sentinel's evidence ladder, as its project page defines it.
const LADDER: [string, string, string][] = [
  ["LINE PROVEN", "marker + the accused line executed", "text-accent"],
  ["CLASS ONLY", "marker, but that line never ran", "text-warn"],
  ["NOT TESTABLE", "a dependency was missing", "text-muted"],
  ["UNPROVEN", "no exploit succeeded", "text-muted"],
  ["NO PATH", "rejected by the static gate", "text-muted"],
];

// The choke controller's headline table, from its README.
const CHOKE: [string, string][] = [
  ["0", "constraint violations, 30 nominal runs"],
  ["+5.6%", "oil vs a cautious operator"],
  ["69%", "of intervals a conventional PI violates"],
  ["R² 0.98–0.99", "on Honeywell's reference data"],
];

function Visual({ project }: { project: Project }) {
  if (project.diagram === "recon") {
    return (
      <figure className="border border-rule bg-panel">
        <ReconDiagram className="py-6" />
        <figcaption className="border-t border-rule px-4 py-2 font-mono text-[11.5px] text-muted">
          three sources in; matched records and explained exceptions out
        </figcaption>
      </figure>
    );
  }
  if (project.id === "sentinel") {
    return (
      <figure className="border border-rule">
        <figcaption className="border-b border-rule px-4 py-2 font-mono text-[11.5px] text-muted">the evidence ladder</figcaption>
        <ul className="divide-y divide-rule bg-panel">
          {LADDER.map(([tier, rule, tone]) => (
            <li key={tier} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
              <span className={cn("whitespace-nowrap font-mono text-[12px] font-semibold tracking-wide", tone)}>{tier}</span>
              <span className="text-right text-[13px] text-body">{rule}</span>
            </li>
          ))}
        </ul>
      </figure>
    );
  }
  if (project.id === "choke") {
    return (
      <dl className="grid grid-cols-2 gap-px border border-rule bg-rule">
        {CHOKE.map(([value, label]) => (
          <div key={label} className="flex flex-col bg-panel px-4 py-4">
            <dt className="order-2 mt-1 text-[12.5px] leading-snug text-muted">{label}</dt>
            <dd className="order-1 font-mono text-[20px] font-medium text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (project.image) {
    const live = project.links.find((l) => /live/i.test(l.label));
    return (
      <figure className="border border-rule">
        <figcaption className="truncate border-b border-rule px-4 py-2 font-mono text-[11.5px] text-muted">
          {live ? live.href.replace(/^https?:\/\//, "") : project.name}
        </figcaption>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
        <img src={asset(project.image)} alt={`${project.name} screenshot`} loading="lazy" className="block w-full" />
      </figure>
    );
  }
  return null;
}

function ProjectRow({ project, index, open, onToggle }: {
  project: Project; index: number; open: boolean; onToggle: () => void;
}) {
  const panelId = `project-${project.id}`;
  return (
    <li className="border-b border-rule">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group grid w-full grid-cols-[32px_minmax(0,1fr)_auto] items-start gap-x-4 py-6 text-left sm:grid-cols-[48px_minmax(0,1fr)_minmax(0,220px)_24px] sm:gap-x-6"
        >
          <span className="pt-2 font-mono text-[12px] text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className="min-w-0">
            <span className="block text-[22px] font-semibold leading-tight tracking-[-0.015em] text-ink group-hover:underline group-hover:decoration-rule sm:text-[28px]">
              {project.name}
            </span>
            <span className="mt-1.5 block max-w-[60ch] text-[15px] leading-[1.55] text-body">{project.tagline}</span>
            <span className="mt-2 block font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">
              {[...project.tags, project.period].filter(Boolean).join(" · ")}
            </span>
            {project.metric && <Metric metric={project.metric} className="mt-4 sm:hidden" />}
          </span>
          {project.metric ? <Metric metric={project.metric} className="hidden pt-1 sm:block" /> : <span className="hidden sm:block" />}
          <Plus
            aria-hidden
            className={cn("mt-2 h-5 w-5 text-muted transition-transform group-hover:text-ink", open && "rotate-45 text-ink")}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 sm:pl-[72px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="min-w-0">
                <ul className="space-y-3 text-[15px] leading-[1.65] text-body">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-[11px] h-px w-3 shrink-0 bg-muted" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[12.5px] leading-relaxed text-muted">{project.stack.join(" · ")}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1 text-[14.5px] font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
                      {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
              <div className="min-w-0 self-start">
                <Visual project={project} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Tag | "All">("All");
  const [open, setOpen] = useState<Set<string>>(() => new Set([projects[0].id]));
  const shown = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));
  const counts = Object.fromEntries(TAGS.map((t) => [t, projects.filter((p) => p.tags.includes(t)).length]));

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <Section
      id="projects"
      n="02"
      label="Projects"
      title={<>Selected work, <Em>each measured</Em> against something.</>}
      lede="Open a project for how it works, what was measured and where the numbers come from. Every figure here is in that project's repository."
    >
      <div role="group" aria-label="Filter projects by area" className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-b border-rule pb-3">
        {(["All", ...TAGS] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={cn(
              "font-mono text-[12.5px] uppercase tracking-[.08em] underline-offset-[10px] transition-colors",
              filter === t ? "text-ink underline decoration-ink decoration-2" : "text-muted hover:text-ink"
            )}
          >
            {t} <span className="text-muted">{t === "All" ? projects.length : counts[t]}</span>
          </button>
        ))}
      </div>
      <ul className="border-t-0">
        {shown.map((p) => (
          <ProjectRow key={p.id} project={p} index={projects.indexOf(p)} open={open.has(p.id)} onToggle={() => toggle(p.id)} />
        ))}
      </ul>
    </Section>
  );
}
