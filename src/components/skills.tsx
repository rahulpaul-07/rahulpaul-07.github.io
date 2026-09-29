import { ArrowUpRight } from "lucide-react";

import { credentials, skills } from "@/data/portfolio";
import { Em, Section } from "./section";

const LABELS: Record<string, string> = {
  languages: "Languages",
  foundations: "Foundations",
  backend: "Backend and web",
  "testing-and-ops": "Testing and ops",
  "ml-and-security": "ML and security",
};

export function Skills() {
  return (
    <Section id="skills" n="04" label="Skills" title={<>The tools, <Em>and the receipts.</Em></>}>
      <dl className="mt-10 divide-y divide-rule border-y border-rule">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="grid gap-2 py-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6">
            <dt className="font-mono text-[12.5px] uppercase tracking-[.08em] text-muted sm:leading-[1.7rem]">
              {LABELS[group] ?? group}
            </dt>
            <dd className="text-[15.5px] leading-[1.7] text-body">{items.join(" · ")}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-14 font-mono text-[12px] uppercase tracking-[.14em] text-muted">Credentials</h3>
      <ul className="mt-4 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {credentials.map((c) => (
          <li key={c.name} className="min-w-0 bg-paper">
            <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-4 hover:bg-panel">
              <span className="font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{c.issuer}</span>
              <span className="mt-1 text-[15px] font-medium text-ink">
                {c.name} <ArrowUpRight className="inline h-3.5 w-3.5 text-muted group-hover:text-ink" aria-hidden />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
