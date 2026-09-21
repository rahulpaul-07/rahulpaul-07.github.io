"use client";

import { useEffect, useState } from "react";
import { onBootDone } from "@/lib/events";
import { HyperText } from "./ui/hyper-text";

const GLYPHS = "01<>/{}[]#$%&*+=?ABCDEF".split("");

// The name decodes once the boot screen has cleared (remounting replays the effect).
export function HeroName({ first, last }: { first: string; last: string }) {
  const [run, setRun] = useState(0);
  useEffect(() => onBootDone(() => setRun((n) => n + 1)), []);

  const cls = "block py-0 text-[clamp(3.2rem,10vw,5.8rem)] leading-[0.95] tracking-[-0.03em]";
  return (
    <span key={run} aria-hidden="true" className="glow block font-mono font-semibold text-phosphor" style={{ fontStretch: "112.5%" }}>
      <HyperText as="span" duration={900} characterSet={GLYPHS} className={cls}>
        {first}
      </HyperText>
      <HyperText as="span" delay={250} duration={900} characterSet={GLYPHS} className={cls}>
        {last}
      </HyperText>
    </span>
  );
}
