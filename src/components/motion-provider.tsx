"use client";

import { MotionConfig } from "motion/react";

// "user": people who ask their OS for reduced motion get fades without movement.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
