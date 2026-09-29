"use client";

import { FileText, Moon, Sun } from "lucide-react";

import { person } from "@/data/portfolio";
import { asset } from "@/lib/utils";

const NAV: [string, string][] = [
  ["work", "Experience"],
  ["projects", "Projects"],
  ["github", "GitHub"],
  ["skills", "Skills"],
  ["about", "About"],
  ["contact", "Contact"],
];

function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage blocked: the choice lasts for this page view */
  }
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-6 px-4 sm:px-8">
        <a href="#top" className="font-serif text-[22px] italic leading-none text-ink">
          {person.name}
        </a>
        <nav aria-label="Sections" className="ml-auto hidden items-center gap-5 text-[14px] lg:flex">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-body hover:text-ink">{label}</a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <button type="button" onClick={toggleTheme} aria-label="Toggle colour theme" className="p-1 text-body hover:text-ink">
            <Sun className="hidden h-4 w-4 dark:block" aria-hidden />
            <Moon className="h-4 w-4 dark:hidden" aria-hidden />
          </button>
          <a href={asset(person.resume)} target="_blank" rel="noopener"
             className="inline-flex items-center gap-1.5 border border-ink px-3 py-1 text-[14px] text-ink hover:bg-ink hover:text-paper">
            <FileText className="h-3.5 w-3.5" aria-hidden /> Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
