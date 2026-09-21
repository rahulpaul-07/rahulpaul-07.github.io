"use client";

import { useEffect, useRef, useState } from "react";
import { markBootDone } from "@/lib/events";
import { startMatrixRain } from "@/lib/matrix";

const AUTO_ENTER_MS = 4500;

// Landing screen: digital rain with "Wake up, Neo…", shown once per browser session.
//
// It never traps anyone: any key, click, tap or scroll enters, and it enters by itself
// after a few seconds (the bar at the bottom shows that countdown).
// - The inline script in layout.tsx adds `booted` to <html> on repeat visits and for
//   reduced-motion users, and CSS hides this screen before React even loads.
// - The text animates with pure CSS, so a slow script load still shows it from first paint.
// - A CSS failsafe hides the screen after 7s even if JavaScript never runs.
export function MatrixIntro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("booted")) {
      markBootDone();
      const t = setTimeout(() => setGone(true), 0);
      return () => clearTimeout(t);
    }

    const stopRain = canvasRef.current ? startMatrixRain(canvasRef.current, { fill: true }) : () => {};
    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;

    const enter = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem("rp-booted", "1");
      } catch {}
      setLeaving(true);
      markBootDone();
      timers.push(
        setTimeout(() => {
          stopRain();
          setGone(true);
        }, 600)
      );
      events.forEach((ev) => window.removeEventListener(ev, enter));
    };

    const events = ["keydown", "pointerdown", "wheel", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, enter, { passive: true }));
    // count from page start, not from when this script happened to load
    timers.push(setTimeout(enter, Math.max(300, AUTO_ENTER_MS - performance.now())));

    return () => {
      timers.forEach(clearTimeout);
      events.forEach((ev) => window.removeEventListener(ev, enter));
      stopRain();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`boot-screen fixed inset-0 z-[100] bg-void transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* soft dark pool behind the text so it stays readable over the rain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_28%_at_50%_50%,rgb(3_7_10/0.92),transparent)]" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center font-mono">
        <p className="glow intro-type text-[clamp(1.4rem,4vw,2.4rem)] text-phosphor">Wake up, Neo…</p>
        <p className="intro-fade mt-4 text-[0.85rem] text-ink" style={{ animationDelay: "1.5s" }}>
          The portfolio has you.
        </p>
        <button
          type="button"
          className="intro-fade mt-10 rounded-md border border-phosphor/40 px-4 py-2 text-[0.78rem] text-phosphor transition-colors hover:bg-phosphor/10"
          style={{ animationDelay: "2s" }}
        >
          Enter <span className="text-muted">(or press any key)</span>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-line" aria-hidden="true">
        <div className="intro-progress h-full bg-phosphor shadow-[0_0_10px_rgb(125_255_179/0.8)]" />
      </div>
    </div>
  );
}
