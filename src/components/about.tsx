import { about, education } from "@/data/portfolio";
import { Section } from "./section";

export function About() {
  return (
    <Section id="about" command="cat about.md" title="About">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="max-w-[62ch] space-y-5 text-[1.05rem]">
          {about.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>

        <div>
          <p className="font-mono text-[0.75rem] text-muted">
            <span className="text-phosphor-dim">$</span> cat education.txt
          </p>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {education.map((e) => (
              <li key={e.school} className="py-5">
                <p className="font-medium text-ink">{e.school}</p>
                <p className="text-muted">{e.detail}</p>
                <p className="mt-2 font-mono text-[0.75rem] text-muted">
                  {e.period} <span className="ml-3 text-amber">{e.score}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
