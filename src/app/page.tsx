import { StatusBar } from "@/components/status-bar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Interests } from "@/components/interests";
import { SiteDock } from "@/components/site-dock";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MatrixIntro } from "@/components/matrix-intro";
import { CommandPalette } from "@/components/command-palette";
import { MatrixRain } from "@/components/matrix-rain";

export default function Home() {
  return (
    <div className="scanlines relative overflow-x-clip">
      <a
        href="#about"
        className="sr-only z-[70] bg-phosphor px-3 py-2 font-mono text-void focus:not-sr-only focus:fixed focus:left-3 focus:top-12"
      >
        Skip to content
      </a>
      <StatusBar />
      <ScrollProgress className="top-10 z-50 h-0.5 bg-none bg-phosphor shadow-[0_0_10px_rgb(125_255_179/0.8)]" />

      <main className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Skills />
        <Interests />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-5 pb-28 pt-8 font-mono text-[0.72rem] text-muted sm:px-8">
          <p>
            <span className="text-phosphor-dim">$</span> logout
            <br />
            Connection to rahulpaul-07.github.io closed.
          </p>
          <p className="self-end">
            Keys: <span className="text-phosphor">/</span> terminal, <span className="text-phosphor">0–5</span> sections, <span className="text-phosphor">Ctrl K</span> commands
          </p>
        </div>
      </footer>

      <SiteDock />
      <CommandPalette />
      <MatrixRain />
      <MatrixIntro />
    </div>
  );
}
