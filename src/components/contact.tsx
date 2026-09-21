"use client";

import { useState } from "react";
import { person } from "@/data/portfolio";
import { Section } from "./section";
import { DottedMap } from "./ui/dotted-map";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  }

  return (
    <Section id="contact" command="mail rahul" title="Contact">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
      <p className="max-w-[58ch] text-[1.05rem]">
        I&apos;m open to software engineering, machine learning, quant and security roles: internships
        from January to June 2027, and full-time positions after I graduate in 2027. Email is the
        fastest way to reach me.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${person.email}`}
          className="glow break-all font-mono text-[clamp(1.1rem,3.4vw,2rem)] text-phosphor underline decoration-phosphor-dim underline-offset-8 hover:decoration-phosphor"
        >
          {person.email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-[0.75rem] text-muted transition-colors hover:border-phosphor hover:text-phosphor"
        >
          <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
        </button>
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.8rem] text-muted">
        <li><a className="hover:text-phosphor" href={`tel:${person.phone.replace(/\s/g, "")}`}>{person.phone}</a></li>
        <li><a className="hover:text-phosphor" href={person.links.github} target="_blank" rel="noreferrer">GitHub</a></li>
        <li><a className="hover:text-phosphor" href={person.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
        <li><a className="hover:text-phosphor" href={person.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a></li>
      </ul>
      </div>

      <figure className="relative">
        <DottedMap
          width={150}
          height={75}
          mapSamples={4500}
          dotRadius={0.22}
          dotColor="#2f7a57"
          markerColor="#ffb454"
          pulse
          markers={[{ lat: 12.97, lng: 77.59, size: 0.9 }]}
          className="w-full opacity-80"
          aria-hidden="true"
        />
        <figcaption className="mt-3 font-mono text-[0.72rem] text-muted">
          <span className="text-amber">●</span> Bengaluru, India. Open to remote and on-site roles.
        </figcaption>
      </figure>
      </div>
    </Section>
  );
}
