"use client";

import { useRef } from "react";
import { CircleCheck, CreditCard, FileSpreadsheet, Landmark, Scale, TriangleAlert } from "lucide-react";
import { AnimatedBeam } from "./ui/animated-beam";
import { cn } from "@/lib/utils";

function Node({
  nodeRef,
  label,
  icon: Icon,
  tone = "ink",
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "ink" | "phosphor" | "amber";
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        ref={nodeRef}
        className={cn(
          "z-10 flex h-11 w-11 items-center justify-center rounded-xl border bg-void",
          tone === "phosphor" && "h-14 w-14 border-phosphor/60 text-phosphor shadow-[0_0_24px_-4px_rgb(125_255_179/0.5)]",
          tone === "amber" && "border-amber/40 text-amber",
          tone === "ink" && "border-line text-ink"
        )}
      >
        <Icon className={tone === "phosphor" ? "h-6 w-6" : "h-5 w-5"} />
      </div>
      <span className="text-center font-mono text-[0.62rem] leading-tight text-muted">{label}</span>
    </div>
  );
}

// Three sources flow into the engine; matched records and explained exceptions flow out.
export function ReconDiagram({ className }: { className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const ledger = useRef<HTMLDivElement>(null);
  const gateway = useRef<HTMLDivElement>(null);
  const bank = useRef<HTMLDivElement>(null);
  const engine = useRef<HTMLDivElement>(null);
  const matched = useRef<HTMLDivElement>(null);
  const exceptions = useRef<HTMLDivElement>(null);

  const beam = { containerRef: container, pathColor: "#16262b", pathOpacity: 1, gradientStartColor: "#7dffb3", gradientStopColor: "#2f7a57" };

  return (
    <div
      ref={container}
      role="img"
      aria-label="Diagram: order ledger, gateway report and bank statement flow into the engine, which outputs matched records and exceptions with reasons."
      className={cn("relative flex items-center justify-between gap-4 px-2 py-4", className)}
    >
      <div className="flex flex-col gap-5">
        <Node nodeRef={ledger} label="order ledger" icon={FileSpreadsheet} />
        <Node nodeRef={gateway} label="gateway report" icon={CreditCard} />
        <Node nodeRef={bank} label="bank statement" icon={Landmark} />
      </div>
      <Node nodeRef={engine} label="engine" icon={Scale} tone="phosphor" />
      <div className="flex flex-col gap-10">
        <Node nodeRef={matched} label="matched" icon={CircleCheck} tone="phosphor" />
        <Node nodeRef={exceptions} label="exceptions + reason" icon={TriangleAlert} tone="amber" />
      </div>

      <AnimatedBeam {...beam} fromRef={ledger} toRef={engine} curvature={-40} duration={4} />
      <AnimatedBeam {...beam} fromRef={gateway} toRef={engine} duration={4} delay={0.4} />
      <AnimatedBeam {...beam} fromRef={bank} toRef={engine} curvature={40} duration={4} delay={0.8} />
      <AnimatedBeam {...beam} fromRef={engine} toRef={matched} curvature={-30} duration={4} delay={1.6} />
      <AnimatedBeam
        {...beam}
        fromRef={engine}
        toRef={exceptions}
        curvature={30}
        duration={4}
        delay={2}
        gradientStartColor="#ffb454"
        gradientStopColor="#7a5520"
      />
    </div>
  );
}
