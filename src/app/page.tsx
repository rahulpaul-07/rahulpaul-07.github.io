import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { OnGithub } from "@/components/on-github";
import { Projects } from "@/components/projects";
import { SiteHeader } from "@/components/site-header";
import { Skills } from "@/components/skills";
import { Work } from "@/components/work";
import { MotionProvider } from "@/components/motion-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { person } from "@/data/portfolio";

export default function Home() {
  return (
    <MotionProvider>
      <a href="#work"
         className="sr-only z-[70] bg-ink px-3 py-2 text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Skip to content
      </a>
      <ScrollProgress className="h-[2px] bg-none bg-ink" />
      <SiteHeader />
      <main>
        <Hero />
        <Work />
        <Projects />
        <OnGithub />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-baseline justify-between gap-4 px-4 py-8 text-[13.5px] text-muted sm:px-8">
          <p>
            <span className="font-serif text-[18px] italic text-ink">{person.name}</span> · {person.location}
          </p>
          <p>
            Built with Next.js, Tailwind and Motion; components adapted from{" "}
            <a href="https://magicui.design" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">Magic UI</a>.
          </p>
        </div>
      </footer>
    </MotionProvider>
  );
}
