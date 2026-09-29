import { ArrowUpRight } from "lucide-react";

import { experience, writing } from "@/data/portfolio";
import { SamsungPipeline } from "./samsung-pipeline";
import { Em, Section } from "./section";

export function Work() {
  return (
    <Section
      id="work"
      n="01"
      label="Experience"
      title={<>From a research model <Em>to a phone.</Em></>}
    >
      {experience.map((job) => (
        <article key={job.org} className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[20px] font-semibold text-ink">
              {job.role} <span className="font-normal text-body">· {job.org}</span>
            </h3>
            <p className="font-mono text-[12.5px] text-muted">{job.period}</p>
          </div>
          <ul className="mt-5 max-w-[70ch] space-y-3 text-[15.5px] leading-[1.65] text-body">
            {job.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[11px] h-px w-3 shrink-0 bg-muted" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <SamsungPipeline />
        </article>
      ))}

      <h3 id="writing" className="mt-16 scroll-mt-24 font-mono text-[12px] uppercase tracking-[.14em] text-muted">Writing</h3>
      {writing.map((w) => (
        <a key={w.url} href={w.url} target="_blank" rel="noopener noreferrer"
           className="group mt-4 block border border-rule p-5 transition-colors hover:border-ink">
          <p className="font-mono text-[12px] text-muted">{w.venue}</p>
          <p className="mt-1 text-[18px] font-semibold text-ink group-hover:underline group-hover:decoration-rule">
            {w.title} <ArrowUpRight className="inline h-4 w-4" aria-hidden />
          </p>
          <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.6] text-body">{w.desc}</p>
        </a>
      ))}
    </Section>
  );
}
