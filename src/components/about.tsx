import { ArrowUpRight } from "lucide-react";

import { about, education, interests, music } from "@/data/portfolio";
import { Em, Section } from "./section";

export function About() {
  return (
    <Section id="about" n="05" label="About" title={<>Mostly learned <Em>by building.</Em></>}>
      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-5 text-[16px] leading-[1.7] text-body">
          {about.map((para) => <p key={para} className="max-w-[64ch]">{para}</p>)}
        </div>

        <div>
          <h3 className="font-mono text-[12px] uppercase tracking-[.14em] text-muted">Education</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {education.map((e) => (
              <li key={e.school} className="py-4">
                <p className="text-[15.5px] font-medium text-ink">{e.school}</p>
                <p className="text-[14.5px] text-body">{e.detail}</p>
                <p className="mt-1 flex justify-between gap-4 font-mono text-[12.5px] text-muted">
                  <span>{e.period}</span>
                  <span className="text-ink">{e.score}</span>
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-mono text-[12px] uppercase tracking-[.14em] text-muted">Beyond the code</h3>
          <dl className="mt-4 space-y-2.5 text-[14.5px]">
            {interests.map((i) => (
              <div key={i.id} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <dt className="text-ink">{i.title}</dt>
                <dd className="text-body">{i.items.join(", ")}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
              <dt className="text-ink">Music</dt>
              <dd>
                <a href={music.url} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 text-body underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink">
                  The playlist I work to <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
