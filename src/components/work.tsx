import { experience, writing } from "@/data/portfolio";
import { Section } from "./section";
import { SamsungPipeline } from "./samsung-pipeline";

export function Work() {
  return (
    <Section id="work" command="tail experience.log" title="Work">
      <ol className="max-w-4xl">
        {experience.map((job) => (
          <li key={job.org} className="border-l border-phosphor-dim pl-6 sm:pl-8">
            <p className="font-mono text-[0.75rem] text-phosphor">[{job.period}]</p>
            <h3 className="mt-2 text-xl font-medium text-ink">{job.role}</h3>
            <p className="text-muted">{job.org}</p>
            <ul className="mt-6 space-y-4">
              {job.points.map((pt) => (
                <li key={pt.slice(0, 20)} className="flex max-w-[70ch] gap-3">
                  <span aria-hidden="true" className="mt-[0.3rem] font-mono text-[0.75rem] text-phosphor-dim">
                    &gt;
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <SamsungPipeline />
          </li>
        ))}
      </ol>

      <div className="mt-20 max-w-4xl">
        <p className="font-mono text-[0.75rem] text-muted">
          <span className="text-phosphor-dim">$</span> ls publications/
        </p>
        {writing.map((w) => (
          <a
            key={w.title}
            href={w.url}
            target="_blank"
            rel="noreferrer"
            className="group mt-4 block rounded-xl border border-line bg-panel/60 p-6 transition-colors hover:border-phosphor-dim"
          >
            <p className="font-mono text-[0.75rem] text-amber">{w.venue}</p>
            <h3 className="mt-2 text-lg font-medium text-ink group-hover:text-phosphor">{w.title}</h3>
            <p className="mt-2 max-w-[65ch] text-muted">{w.desc}</p>
            <p className="mt-4 font-mono text-[0.75rem] text-phosphor underline underline-offset-4">Read on Springer</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
