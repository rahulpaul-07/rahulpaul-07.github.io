import { ArrowUpRight } from "lucide-react";

import { moreRepos, person } from "@/data/portfolio";
import { GithubActivity } from "./github-activity";
import { Em, Section } from "./section";

export function OnGithub() {
  return (
    <Section id="github" n="03" label="On GitHub" title={<>Smaller things, <Em>also shipped.</Em></>}>
      <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {moreRepos.map((r) => (
          <li key={r.name} className="min-w-0 bg-paper">
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-5 hover:bg-panel">
              <span className="flex min-w-0 items-baseline justify-between gap-3">
                <span className="truncate font-mono text-[14px] font-medium text-ink group-hover:underline group-hover:decoration-rule">
                  {r.name}
                </span>
                <span className="shrink-0 font-mono text-[11.5px] uppercase tracking-[.08em] text-muted">{r.lang}</span>
              </span>
              <span className="mt-2 text-[14.5px] leading-[1.6] text-body">{r.desc}</span>
            </a>
          </li>
        ))}
      </ul>
      <a href={person.links.github} target="_blank" rel="noopener noreferrer"
         className="mt-5 inline-flex items-center gap-1 text-[14.5px] font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
        Everything else on GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
      <GithubActivity />
    </Section>
  );
}
