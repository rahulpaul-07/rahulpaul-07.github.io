// Adapted from Magic UI (https://magicui.design), MIT License, Copyright (c) Magic UI.
// Changes: the final number is in the markup from the start and the count only
// runs once the number scrolls into view, so a page captured without scrolling (a
// link preview, a crawler, a full-page screenshot) never shows "407 → 407" or
// "0%"; the count is a fixed-length tween, because the spring's long tail sat on
// numbers that were never measured; reduced motion skips it.
"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: "0px" })

  // "down" counts from `value` to `startValue`; "up" from `startValue` to `value`.
  const from = direction === "down" ? value : startValue
  const to = direction === "down" ? startValue : value
  const format = (n: number) =>
    Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(n.toFixed(decimalPlaces)))

  useEffect(() => {
    if (!isInView || reduced) return
    const el = ref.current
    const controls = animate(from, to, {
      delay,
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        if (el) el.textContent = format(latest)
      },
      onComplete: () => {
        if (el) el.textContent = format(to)
      },
    })
    return () => {
      controls.stop()
      if (el) el.textContent = format(to)
    }
    // format depends only on decimalPlaces
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, reduced, from, to, delay, decimalPlaces])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums",
        className
      )}
      {...props}
    >
      {/* the measured number, before and after the count */}
      {format(to)}
    </span>
  )
}
