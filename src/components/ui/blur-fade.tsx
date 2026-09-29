// Adapted from Magic UI's Blur Fade (https://magicui.design), MIT License, Copyright (c) Magic UI.
// Changes: in-view by default, a smaller offset and blur. Under reduced motion the
// MotionConfig in page.tsx drops the movement and the content only fades.
"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function BlurFade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
