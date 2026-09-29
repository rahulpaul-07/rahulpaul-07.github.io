"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, FileText } from "lucide-react";

import { person } from "@/data/portfolio";
import { asset } from "@/lib/utils";
import { Em } from "./section";
import { BlurFade } from "./ui/blur-fade";
import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "./ui/brand-icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false); // clipboard blocked: the address is still a mailto link
    }
  };

  const links = [
    { label: "GitHub", href: person.links.github, Icon: GithubIcon },
    { label: "LinkedIn", href: person.links.linkedin, Icon: LinkedinIcon },
    { label: "LeetCode", href: person.links.leetcode, Icon: LeetcodeIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-rule bg-panel">
      <div className="mx-auto max-w-[1120px] px-4 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[12px] uppercase tracking-[.14em] text-muted"><span className="text-ink">§06</span> Contact</p>
        <BlurFade>
          <h2 id="contact-title" className="mt-6 max-w-[18ch] text-balance text-[36px] sm:max-w-none font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[56px]">
            Hiring for 2027? <Em>Let&rsquo;s talk.</Em>
          </h2>
        </BlurFade>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.65] text-body">
          I&rsquo;m looking for software engineering, machine learning and security roles: internships from
          January to June 2027, and full-time positions after I graduate in 2027. Email is the fastest way to reach me.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <a href={`mailto:${person.email}`}
             className="break-all text-[26px] font-semibold leading-tight tracking-[-0.01em] text-ink underline decoration-rule decoration-2 underline-offset-8 hover:decoration-ink sm:text-[40px]">
            {person.email}
          </a>
          <button type="button" onClick={copy}
                  className="inline-flex items-center gap-1.5 border border-rule px-3 py-1.5 font-mono text-[12.5px] text-body hover:border-ink hover:text-ink">
            {copied ? <Check className="h-3.5 w-3.5 text-accent" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
            <span aria-live="polite">{copied ? "copied" : "copy"}</span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-[14.5px]">
          {links.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 border border-ink px-4 py-2 font-medium text-ink hover:bg-ink hover:text-paper">
              <Icon className="h-4 w-4" /> {label}
            </a>
          ))}
          <a href={asset(person.resume)} target="_blank" rel="noopener"
             className="inline-flex items-center gap-2 bg-ink px-4 py-2 font-medium text-paper hover:opacity-85">
            <FileText className="h-4 w-4" aria-hidden /> Résumé (PDF) <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
        <p className="mt-6 font-mono text-[12.5px] text-muted">{person.phone} · {person.location}</p>
      </div>
    </section>
  );
}
