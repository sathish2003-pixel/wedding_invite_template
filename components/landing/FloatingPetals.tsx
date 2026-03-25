"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
}

interface FloatingPetalsProps {
  color?: string;
  count?: number;
}

export function FloatingPetals({
  color = "rgba(183,110,121,0.7)",
  count,
}: FloatingPetalsProps) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    const petalCount = count ?? (isMobile ? 12 : 24);

    const generated: Petal[] = Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 12,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 8,
      sway: 20 + Math.random() * 60,
      opacity: 0.4 + Math.random() * 0.4,
    }));

    setPetals(generated);
  }, [count]);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute petal animate-petal-fall"
          style={{
            left: petal.left,
            top: "-20px",
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            backgroundColor: color,
            opacity: petal.opacity,
            "--petal-duration": `${petal.duration}s`,
            "--petal-delay": `${petal.delay}s`,
            "--petal-sway": `${petal.sway}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
