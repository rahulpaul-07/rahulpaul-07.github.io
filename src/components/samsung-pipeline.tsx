"use client";

import { useRef } from "react";
import { Binary, Brain, FlaskConical, Minimize2, Smartphone } from "lucide-react";
import { pipeline } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "./ui/animated-beam";

const ICONS = { teacher: Brain, distill: FlaskConical, student: Minimize2, int8: Binary, device: Smartphone } as const;

// EmoCapNet from research model to phone. Horizontal on wide screens, vertical on phones.
export function SamsungPipeline() {
  const container = useRef<HTMLDivElement>(null);
  const r0 = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);
  const nodeRefs = [r0, r1, r2, r3, r4];
  const beam = {
    containerRef: container,
    duration: 3,
    pathColor: "#16262b",
    pathOpacity: 1,
    gradientStartColor: "#7dffb3",
    gradientStopColor: "#ffb454",
  };

  return (
    <div
      ref={container}
      role="img"
      aria-label="EmoCapNet pipeline: ViT plus GPT-2 teacher, distilled into a TinyCLIP-ViT-8M plus DistilGPT-2 student, quantization-aware trained to INT8, running on-device at 146 MB and about 450 ms per caption."
      className="relative mt-10 flex flex-col gap-7 rounded-xl border border-line bg-panel/60 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-2"
    >
      {pipeline.map((step, i) => {
        const Icon = ICONS[step.id as keyof typeof ICONS];
        const last = i === pipeline.length - 1;
        return (
          <div key={step.id} className="flex items-center gap-4 sm:w-28 sm:flex-col sm:gap-2 sm:text-center">
            <div
              ref={nodeRefs[i]}
              className={cn(
                "z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-void",
                last ? "border-amber/50 text-amber shadow-[0_0_24px_-6px_rgb(255_180_84/0.6)]" : "border-line text-phosphor"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-mono text-[0.78rem] text-ink">{step.title}</p>
              <p className={cn("text-[0.72rem] leading-snug", last ? "text-amber" : "text-muted")}>{step.detail}</p>
            </div>
          </div>
        );
      })}

      <AnimatedBeam {...beam} fromRef={r0} toRef={r1} delay={0} />
      <AnimatedBeam {...beam} fromRef={r1} toRef={r2} delay={0.5} />
      <AnimatedBeam {...beam} fromRef={r2} toRef={r3} delay={1} />
      <AnimatedBeam {...beam} fromRef={r3} toRef={r4} delay={1.5} />
    </div>
  );
}
