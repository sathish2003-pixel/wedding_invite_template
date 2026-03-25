"use client";

import { useCallback, useEffect } from "react";

interface ConfettiEffectProps {
  trigger: boolean;
  colors?: string[];
  particleCount?: number;
}

export function ConfettiEffect({
  trigger,
  colors = ["#B76E79", "#D4A574", "#ffffff", "#ff6b6b"],
  particleCount = 120,
}: ConfettiEffectProps) {
  const fire = useCallback(async () => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const confetti = (await import("canvas-confetti")).default;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? Math.floor(particleCount * 0.5) : particleCount;

    // Burst 1 — center
    confetti({
      particleCount: count,
      spread: 80,
      origin: { x: 0.5, y: 0.3 },
      colors,
      disableForReducedMotion: true,
    });

    // Burst 2 — left
    setTimeout(() => {
      confetti({
        particleCount: Math.floor(count * 0.5),
        spread: 60,
        origin: { x: 0.2, y: 0.4 },
        colors,
        disableForReducedMotion: true,
      });
    }, 800);

    // Burst 3 — right
    setTimeout(() => {
      confetti({
        particleCount: Math.floor(count * 0.5),
        spread: 60,
        origin: { x: 0.8, y: 0.4 },
        colors,
        disableForReducedMotion: true,
      });
    }, 1600);
  }, [colors, particleCount]);

  useEffect(() => {
    if (trigger) {
      fire();
    }
  }, [trigger, fire]);

  return null;
}
