import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";

import { person } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { Em } from "./section";
import { BlurFade } from "./ui/blur-fade";
import { NumberTicker } from "./ui/number-ticker";

// Each figure is from the education, experience, writing and credentials entries
// in src/data/portfolio.ts.
const FACTS = [
  { value: 9.52, decimals: 2, unit: "/ 10", label: "CGPA, B.E. Computer Science (Cyber Security)" },
  { text: "Samsung PRISM", label: "Project intern, Dec 2025 – Jul 2026" },
  { text: "Springer Nature", label: "Co-authored book chapter, 2025" },
  { value: 1858, decimals: 0, unit: "", label: "LeetCode max rating, Knight, top 6.13%" },
];

export function Hero() {
  return (
    <header id="top" className="mx-auto max-w-[1120px] px-4 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] uppercase tracking-[.14em] text-muted">
        <span className="inline-flex items-center gap-2 text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {person.status}
        </span>
        <span aria-hidden className="hidden sm:inline">·</span>
        <span>{person.location}</span>
      </p>

      <BlurFade>
        <h1 className="mt-8 max-w-[20ch] text-balance text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[58px] lg:text-[72px]">
          I build where ML, backend and security meet, <Em className="text-accent">and stay for the unglamorous parts.</Em>
        </h1>
      </BlurFade>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <BlurFade delay={0.1}>
          <p className="max-w-[58ch] text-[17px] leading-[1.6] text-body sm:text-[18px]">
            I&rsquo;m <span className="font-medium text-ink">{person.name}</span>, a {person.role} in{" "}
            {person.location.split(",")[0]}. The unglamorous parts are the tests, the CI and the bug that quietly
            halves your scores, so most of my projects ship with an evaluation harness and a check that fails when
            the numbers regress.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[15px]">
            <a href="#projects" className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-85">
              See the work <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a href={asset(person.resume)} target="_blank" rel="noopener"
               className="inline-flex items-center gap-2 border border-ink px-5 py-2.5 font-medium text-ink hover:bg-panel">
              <FileText className="h-4 w-4" aria-hidden /> Résumé
            </a>
            <a href={`mailto:${person.email}`}
               className="inline-flex items-center gap-1 py-2.5 font-medium text-ink underline decoration-rule underline-offset-4 hover:decoration-ink">
              <Mail className="h-4 w-4" aria-hidden /> {person.email}
            </a>
          </div>
        </BlurFade>
        <a href={person.links.github} target="_blank" rel="noopener noreferrer"
           className="hidden items-center gap-1 font-mono text-[12.5px] text-muted hover:text-ink lg:inline-flex">
          github.com/rahulpaul-07 <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      <dl className="mt-14 grid grid-cols-2 gap-px border border-rule bg-rule lg:grid-cols-4">
        {FACTS.map((f) => (
          <div key={f.label} className="flex flex-col bg-paper px-5 py-4">
            <dt className="order-2 mt-1 text-[13px] leading-snug text-muted">{f.label}</dt>
            <dd className="order-1 text-ink">
              {"value" in f && f.value !== undefined ? (
                <span className="text-[26px] font-semibold tracking-[-0.01em]">
                  <NumberTicker value={f.value} decimalPlaces={f.decimals} />
                  {f.unit && <span className="ml-1 text-[15px] font-normal text-muted">{f.unit}</span>}
                </span>
              ) : (
                <span className="text-[20px] font-semibold leading-[1.6] tracking-[-0.01em] sm:text-[22px]">{f.text}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
