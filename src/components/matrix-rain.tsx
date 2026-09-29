"use client";

import { useEffect, useRef, useState } from "react";
import { MATRIX_EVENT } from "@/lib/events";
import { startMatrixRain } from "@/lib/matrix";

// Easter egg for the terminal's `matrix` command: falling glyph rain until any key or click.
export function MatrixRain() {
  const [on, setOn] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const start = () => setOn(true);
    window.addEventListener(MATRIX_EVENT, start);
    return () => window.removeEventListener(MATRIX_EVENT, start);
  }, []);

  useEffect(() => {
    if (!on) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopRain = reduce ? () => {} : startMatrixRain(canvas);

    // ignore the Enter keyup that launched it by arming the exit a moment later
    const stop = () => setOn(false);
    const arm = setTimeout(() => {
      window.addEventListener("keydown", stop);
      window.addEventListener("pointerdown", stop);
    }, 300);
    const auto = setTimeout(stop, 12000);

    return () => {
      stopRain();
      clearTimeout(arm);
      clearTimeout(auto);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div className="fixed inset-0 z-[95] bg-void" role="presentation">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <p className="glow absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-mono text-lg text-phosphor">
        Follow the white rabbit.
        <span className="mt-3 block text-[0.75rem] text-muted">press any key</span>
      </p>
    </div>
  );
}
