"use client";

import { useEffect, useState } from "react";
import { FlickeringGrid } from "./ui/flickering-grid";

// Full-bleed flickering phosphor grid behind the hero, faded out at the edges.
// Freezes (no flicker) for visitors who ask for reduced motion.
export function HeroBackdrop() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setStill(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 [mask-image:radial-gradient(ellipse_70%_60%_at_40%_45%,#000_30%,transparent_80%)]"
    >
      <FlickeringGrid
        className="h-full w-full"
        squareSize={3}
        gridGap={7}
        color="#7dffb3"
        maxOpacity={0.22}
        flickerChance={still ? 0 : 0.12}
      />
    </div>
  );
}
