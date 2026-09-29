// Adapted from Magic UI (https://magicui.design), MIT License, Copyright (c) Magic UI.
// Changes: the real value is in the markup from the start, so a page captured
// without scrolling (a link preview, print, a crawler) never shows a wrong number;
// the count-up is a fixed-length tween, because the original spring's long tail
// sat on figures that were never measured; reduced motion skips it.
"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const format = (n: number, decimals: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

export function NumberTicker({
  value,
  decimalPlaces = 0,
  delay = 0,
  duration = 1.1,
  className,
}: {
  value: number;
  decimalPlaces?: number;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!inView || reduced) return;
    const el = ref.current;
    const controls = animate(0, value, {
      delay,
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (el) el.textContent = format(latest, decimalPlaces);
      },
      onComplete: () => {
        if (el) el.textContent = format(value, decimalPlaces);
      },
    });
    return () => {
      controls.stop();
      if (el) el.textContent = format(value, decimalPlaces);
    };
  }, [inView, reduced, value, decimalPlaces, delay, duration]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {format(value, decimalPlaces)}
    </span>
  );
}
