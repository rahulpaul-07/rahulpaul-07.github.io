"use client";

import { FileText, Mail, SquareTerminal } from "lucide-react";
import { person } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { Dock, DockIcon } from "./ui/dock";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "./ui/brand-icons";
import { FOCUS_TERMINAL_EVENT } from "@/lib/events";

const itemClass =
  "flex h-full w-full items-center justify-center rounded-full text-muted transition-colors hover:bg-phosphor/10 hover:text-phosphor";

// macOS-style magnifying dock, fixed to the bottom of the screen.
export function SiteDock() {
  const links = [
    { label: "GitHub", href: person.links.github, icon: GithubIcon },
    { label: "LinkedIn", href: person.links.linkedin, icon: LinkedinIcon },
    { label: "LeetCode", href: person.links.leetcode, icon: LeetcodeIcon },
    { label: `Email ${person.email}`, href: `mailto:${person.email}`, icon: Mail },
    { label: "Résumé (PDF)", href: asset(person.resume), icon: FileText },
  ];

  return (
    <nav aria-label="Links" className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center">
      <Dock
        iconSize={38}
        iconMagnification={54}
        className="pointer-events-auto mt-0 border-line bg-panel/80 shadow-[0_10px_40px_-10px_rgb(0_0_0/0.8)]"
      >
        <DockIcon>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(FOCUS_TERMINAL_EVENT))}
            aria-label="Open the terminal"
            title="Terminal"
            className={itemClass}
          >
            <SquareTerminal className="h-5 w-5" />
          </button>
        </DockIcon>
        <div className="mx-0.5 h-6 w-px bg-line" aria-hidden="true" />
        {links.map(({ label, href, icon: Icon }) => (
          <DockIcon key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              title={label}
              className={itemClass}
            >
              <Icon className="h-5 w-5" />
            </a>
          </DockIcon>
        ))}
      </Dock>
    </nav>
  );
}
