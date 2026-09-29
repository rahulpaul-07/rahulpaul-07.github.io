import { person } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { HeroName } from "./hero-name";
import { HeroBackdrop } from "./hero-backdrop";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <div id="top" className="relative">
      <HeroBackdrop />

      <div className="relative grid min-h-[100svh] items-center gap-12 pb-24 pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/5 px-3 py-1 font-mono text-[0.72rem] text-amber">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
            </span>
            {person.status}
          </p>

          <h1 className="mt-8">
            <span className="sr-only">{person.name}</span>
            <HeroName first="Rahul" last="Paul" />
          </h1>

          <p className="mt-8 max-w-[34ch] font-mono text-sm text-ink">
            {person.role}, {person.location}.
          </p>
          <p className="mt-4 max-w-[56ch] text-[1.05rem] text-muted">{person.summary}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[0.8rem]">
            <a
              href={asset(person.resume)}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-phosphor px-4 py-2.5 font-medium text-void transition-shadow hover:shadow-[0_0_28px_rgb(125_255_179/0.55)]"
            >
              Download résumé
            </a>
            <a
              href="#projects"
              className="rounded-md border border-line px-4 py-2.5 text-ink transition-colors hover:border-phosphor hover:text-phosphor"
            >
              See projects
            </a>
          </div>
        </div>

        <Terminal />
      </div>
    </div>
  );
}
